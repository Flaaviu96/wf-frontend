import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { enviroment } from '../../../enviroment';
import { User } from '../../../models/user.model';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserSearchAutocompleteService {

  constructor(private http : ApiService) { }

    searchUsers(username : string) : Observable<User[]> {
      return this.http.get(enviroment.apiUserSearchUrl, {
        withCredentials: true,
        params: {search : username}
      });
    }
}
