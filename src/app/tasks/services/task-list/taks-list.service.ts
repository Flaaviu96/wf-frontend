import { Injectable } from '@angular/core';
import { TaskFilter } from '../../../models/taskFilter.model';
import { Observable} from 'rxjs';
import { TaskSummaryDTO } from '../../../models/taskSummaryDTO.model';
import { ApiService } from '../../../core/services/api.service';
import { HttpParams } from '@angular/common/http';
import { enviroment } from '../../../enviroment';
import { PageResultDTO } from '../../../models/pageResultDTO.model';

@Injectable({
  providedIn: 'root',
})
export class TaksListService  {

  constructor(private apiService: ApiService) {}

 filterTasks(projectId: number, taskFilter : TaskFilter): Observable<PageResultDTO<TaskSummaryDTO>> {
    let params = this.populateParams(taskFilter);
    const url = enviroment.apiFilterTaskUrl(projectId);
    return this.apiService.get<PageResultDTO<TaskSummaryDTO>>(url, {withCredentials: true, params});
  }

  populateParams(taskFilter : TaskFilter) : HttpParams{
    let params = new HttpParams();
    Object.entries(taskFilter).forEach(([key, value])=> {
      if (value != null && value != '') {
        params = params.set(key, value);
      }
    });
    return params;
    }
}
