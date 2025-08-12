import { Injectable } from '@angular/core';
import { TaskFilter } from '../../../models/task/taskFilter.model';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { TaskSummaryDTO } from '../../../models/task/taskSummaryDTO.model';
import { ApiService } from '../../../core/services/api.service';
import { HttpParams } from '@angular/common/http';
import { enviroment } from '../../../enviroment';
import { PageResultDTO } from '../../../models/pageResultDTO.model';
import { ProjectCacheService } from '../../../shared/services/project-cache/project-cache.service';

@Injectable({
  providedIn: 'root',
})
export class TaksListService {

  constructor(
    private apiService: ApiService,
    private projectCache: ProjectCacheService
  ) { }



  filterTasks(projectKey: string, taskFilter: TaskFilter): Observable<PageResultDTO<TaskSummaryDTO>> {
    const emptyResult: PageResultDTO<TaskSummaryDTO> = {
      content: [],
      hasNextPage: false,
      nextCursorId: 0,
      prevCursorId: 0
    };
    return this.projectCache.getProjectId(projectKey).pipe(
      switchMap(projectId => {
        let params = this.populateParams(taskFilter);
        const url = enviroment.apiFilterTaskUrl(projectId);
        return this.apiService.get<PageResultDTO<TaskSummaryDTO>>(url, { withCredentials: true, params });
      }),
      catchError(() => of(emptyResult))
    );
  }


  populateParams(taskFilter: TaskFilter): HttpParams {
    let params = new HttpParams();
    Object.entries(taskFilter).forEach(([key, value]) => {
      if (value != null && value != '') {
        params = params.set(key, value);
      }
    });
    return params;
  }
}
