import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { State } from '../../../models/state';
import { WorkflowDTO } from '../../../models/workflowmap';
import { enviroment } from '../../../enviroment';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { ProjectCacheService } from '../project-cache/project-cache.service';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  workflowMaps: { [projectId: number]: { [fromState: string]: State[] } } = {};

  constructor(private apiService: ApiService,
    private projectCache: ProjectCacheService
  ) { }

  getStatesForProject(
    projectId: number,
    fromState: string
  ): Observable<State[]> {
    if (this.hasProject(projectId)) {
      return this.findStates(projectId, fromState);
    }

    const url = enviroment.apiWorkflowUrl(projectId);
    return this.loadWorkflow(projectId)
      .pipe(
        switchMap(() => {
          return this.findStates(projectId, fromState);
        })
      )
  }

getAllTheFromStates(projectKey: string): Observable<string[]> {
  return this.getProjectId(projectKey).pipe(
    switchMap(projectId => {
      if (this.hasProject(projectId)) {
        return of(this.extractStates(projectId));
      }

      return this.loadWorkflow(projectId).pipe(
        map(() => this.extractStates(projectId))
      );
    })
  );
}


  getProjectId(projectKey: string): Observable<number> {
    return this.projectCache.getProjectId(projectKey);
  }

  private extractStates(projectId: number): string[] {
    const stateMap = this.workflowMaps[projectId];
    const stateName: Set<string> = new Set();

    for (const fromState of Object.keys(stateMap)) {
      stateName.add(fromState);

      const targetStates = stateMap[fromState];
      for (const st of targetStates) {
        stateName.add(st.name);
      }
    }
    return Array.from(stateName);
  }

  findStates(projectId: number, fromState: string): Observable<State[]> {
    const key = Object.keys(this.workflowMaps[projectId]).find((state) => {
      return state.includes(fromState);
    })
    return key ? of(this.workflowMaps[projectId][key]) : of([]);
  }

  loadWorkflow(projectId: number): Observable<void> {
    const url = enviroment.apiWorkflowUrl(projectId);
    return this.apiService
      .get<WorkflowDTO>(url, { withCredentials: true })
      .pipe(
        tap((workflow) => {
          this.workflowMaps[workflow.projectId] = workflow.stateDTOListMap;
        }),
        map(() => void 0)
      );
  }

  private hasProject(projectId: number): boolean {
    return !!this.workflowMaps[projectId];
  }
}
