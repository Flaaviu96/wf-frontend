import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { User } from '../../../models/user.model';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-user-search-select',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule], 
  templateUrl: './user-search-select.component.html',
  styleUrl: './user-search-select.component.css'
})
export class UserSearchSelectComponent {
  searchUsers = new FormControl(' ');
  users : User[] = [];


  constructor(private userService : UserService) {}

  ngOnInit() {
    this.searchUsers.valueChanges.pipe(
      debounceTime(300),
      filter((name): name is string => !!name && name.length > 2),
      distinctUntilChanged(),
      tap(name => console.log('Valoare tastată:', name)),
      switchMap(name => this.userService.searchUsers(name ?? ''))
    ).subscribe({
      next: (users) => {
        this.users = users;
        console.log(this.users);
      },
      error: (err) => {
        console.log('Error');
      }
    })
  }

  onSelect(username : string) {

  }

  displayUserFn(user: User): string {
  return user && user.username ? user.username : '';
}

}
