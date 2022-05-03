import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import * as $ from "jquery";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:8080/api/user"
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
  postUser(user: User): Observable<User> {
    return this.http.post<any>(this.baseUrl, user, this.httpOptions);
  }
  /*
  getUsersJQ() {
    return Promise.resolve($.ajax({
      url: this.baseUrl
    }));
  }
  postUserJQ(user:User){
    $.ajax({
      type: "POST",
      url: this.baseUrl,
      data: user,
      dataType: "json",
      headers: { 'Content-Type': 'application/json' }
    });
  }
  */
}
