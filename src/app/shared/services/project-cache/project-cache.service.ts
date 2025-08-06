import { Injectable } from '@angular/core';
import { ProjectService } from '../../../projects/services/project.service';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectCacheService {
  private projectKeyToIdMap = new Map<string, number>();

  constructor(private projectService : ProjectService) { }

  setProjectId(projectKey : string, projectId : number) : void {
    this.projectKeyToIdMap.set(projectKey, projectId);
  }

  getProjectId(projectKey : string) : Observable<number> {
    const projectId = this.projectKeyToIdMap.get(projectKey);
    if (projectId) {
      return of(projectId);
    }
    
    return this.populateProjectIdIfMissing(projectKey).pipe(
      tap((result: number) => {
        if (result) {
          this.setProjectId(projectKey, result);
        }
      }),
      catchError(() => of(0))
    );
  }

  hasProjectId(projectKey : string) : boolean {
    return this.projectKeyToIdMap.has(projectKey);
  }

  private populateProjectIdIfMissing(projectKey : string) : Observable<number> {
    return this.projectService.getProjectId(projectKey);
  }
}
