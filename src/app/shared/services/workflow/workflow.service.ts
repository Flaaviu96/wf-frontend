import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { State } from '../../../models/state';
import { WorkflowDTO } from '../../../models/workflowmap';
import { enviroment } from '../../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
   workflowMaps: { [projectId: number]: { [fromState: string]: State[] } } = {};

  constructor(private apiService : ApiService) { }

  getWorkflowByProjectId(projectId : number) {
    const url = enviroment.apiWorkflowUrl(projectId);
    this.apiService.get<WorkflowDTO>(url, {
      withCredentials: true,
    }).subscribe({
      next : (workflow : WorkflowDTO) => {
        this.workflowMaps[workflow.projectId] = workflow.stateDTOListMap;
      }
    })
  }

}
