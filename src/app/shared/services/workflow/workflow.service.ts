import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { State } from '../../../models/state';
import { WorkflowDTO } from '../../../models/workflowmap';
import { enviroment } from '../../../enviroment';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
   workflowMaps: { [projectId: number]: { [fromState: string]: State[] } } = {};

  constructor(private apiService : ApiService) { }

  getStatesForProject(projectId: number, fromState: string): Observable<State[]> {
  if (this.hasProject(projectId)) {
    return of(this.workflowMaps[projectId][fromState]);
  }

  const url = enviroment.apiWorkflowUrl(projectId);
  return this.apiService.get<WorkflowDTO>(url, { withCredentials: true }).pipe(
    map((workflow: WorkflowDTO) => {
      this.workflowMaps[workflow.projectId] = workflow.stateDTOListMap;
      const key = Object.keys(this.workflowMaps['1']).find(state => state.includes(fromState));
      return key ? this.workflowMaps[projectId][key] : [];
    })
  );
}


  private hasProject(projectId: number) : boolean {
    return ! !this.workflowMaps[projectId];
  }
 
}
