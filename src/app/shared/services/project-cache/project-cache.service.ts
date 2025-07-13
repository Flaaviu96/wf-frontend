import { Injectable } from '@angular/core';
import { ProjectService } from '../../../projects/services/project.service';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectCacheService {
  private projectKeyToIdMap = new Map<string, string>();

  constructor(private projectService : ProjectService) { }

  setProjectId(projectKey : string, projectId : string) : void {
    this.projectKeyToIdMap.set(projectKey, projectId);
  }

  getProjectId(projectKey : string) : Observable<string> {
    const projectId = this.projectKeyToIdMap.get(projectKey);
    if (projectId) {
      return of(projectId);
    }
    
    return this.populateProjectIdIfMissing(projectKey).pipe(
      tap((result: string) => {
        this.setProjectId(projectKey, result);
      }),
      catchError(() => of(''))
    );
  }

  hasProjectId(projectKey : string) : boolean {
    return this.projectKeyToIdMap.has(projectKey);
  }

  private populateProjectIdIfMissing(projectKey : string) : Observable<string> {
    return this.projectService.getProjectId(projectKey);
  }
}
