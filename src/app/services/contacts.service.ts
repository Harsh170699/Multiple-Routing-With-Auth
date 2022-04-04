import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface User{
  name: string, 
  email: string, 
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  // by default it will return Observable of type Object
  getUsers(): Observable<object> {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  viewUser() {
    return this.http.get('https://jsonplaceholder.typicode.com/users/1');
  }

  // by passing type <User> - only name and email and id will be subscribed
  // viewUser(): Observable<User> {
  //   return this.http.get<User>('https://jsonplaceholder.typicode.com/users/1');
  // }
}
