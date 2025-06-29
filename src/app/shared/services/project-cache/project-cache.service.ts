import { Injectable } from '@angular/core';
import { ProjectService } from '../../../projects/services/project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectCacheService {
  private projectKeyToIdMap = new Map<string, string>();

  constructor(private projectService : ProjectService) { }

  setProjectId(projectKey : string, projectId : string) : void {
    this.projectKeyToIdMap.set(projectKey, projectId);
  }

  getProjectId(projectKey : string) : string | undefined {
    return this.projectKeyToIdMap.get(projectKey);
  }

  hasProjectId(projectKey : string) : boolean {
    return this.projectKeyToIdMap.has(projectKey);
  }

  populateProjectIdIfMissing(projectKey : string) : void {
    this.projectService.getProjectId(projectKey).subscribe({
      next: (result : string) => {
        this.setProjectId(projectKey, result);
      }
    })
  }
}
