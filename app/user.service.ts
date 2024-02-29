import { Injectable } from "@angular/core";
import { Observable, catchError, of, tap } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"; 
import { User } from "./user";
import { HttpClientModule } from "@angular/common/http";
import { Student } from "./student";
import { User2 } from "./user2";

@Injectable({
    providedIn: 'root'
})

export class UserService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiServerUrl}/api/users/all`);
  }

  public getUsersByRole(role: String): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/api/users/find/role/${role}`);
  }

  public getUsersByRole2(role: String): Observable<User2[]> {
    return this.http.get<User2[]>(`${this.apiServerUrl}/api/users/find/role/${role}`);
  }

  public addUsers(user: User): Observable<User> {
      return this.http.post<User>(`${this.apiServerUrl}/api/users/add`, user);
  }

  public addStudents(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiServerUrl}/api/users/student/add`, student);
  }

  public updateUsers(user: User): Observable<User> {
      return this.http.put<User>(`${this.apiServerUrl}/api/users/update`, user);
  }

  public deleteUsers(userId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/api/users/delete/${userId}`);
  }

  public authenticate(username: string, password: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/api/users/auth/${username}/${password}`);
  }

  public checkRole(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/api/users/check_role/${username}`).pipe(
      tap(response => console.log('Check Role Response:', response)),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          return of(error.error); 
        } else {
          console.error('Check Role Error:', error);
          throw error;
        }
      })
    );
  }

  public getId(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/api/users/getid/${username}`).pipe(
      tap(response => console.log('Check Id Response:', response)),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          return of(error.error); 
        } else {
          console.error('Check Id Error:', error);
          throw error;
        }
      })
    );
  }
}
