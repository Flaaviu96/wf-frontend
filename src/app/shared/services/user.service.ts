import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { enviroment } from '../../enviroment';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : ApiService) {}


  searchUsers(username : string) : Observable<User[]> {
    return this.http.get(enviroment.apiUserSearchUrl, {
      withCredentials: true,
      params: {name : username}
    });
  }
}
