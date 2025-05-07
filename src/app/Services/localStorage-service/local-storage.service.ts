import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  save(key : string, value : any) : void {
    try {
      const stringifyValue = JSON.stringify(value);
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving in local storage')
    }
  }

  load<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error loading from localStorage', error);
      return null;
    }
  }
}
