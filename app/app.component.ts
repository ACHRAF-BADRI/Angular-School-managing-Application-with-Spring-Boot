import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";
import { User } from './user';
import { Student } from './student';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  userId: number = 0;
  id: number = 0;
  username: string = '';
  password: string = '';
  email: string = '';
  fullname: string = '';

  title = 'shoolmanagerapp';

  user_name: string = '';
  pass_word: string = '';

  formSubmitted: boolean = false;
  authenticationError: string = '';
  isAuthenticated: boolean = false;
  showStudent: boolean = false;
  showAdmin: boolean = false;
  showInstructor: boolean = false;
  showRegisterForm: boolean = false;
  hideRegisterForm: boolean = false;

  constructor(private userservice: UserService, private router: Router) {}

  onSubmit() {
    this.formSubmitted = true;

    if (!this.user_name || !this.pass_word) {
      setTimeout(() => {
        this.clearErrorMessages();
      }, 2000);
      return; 
    }
    this.userservice.authenticate(this.user_name, this.pass_word).subscribe(
      (response: boolean) => {
        if (response) {
          this.userservice.checkRole(this.user_name).subscribe(
            (response: any) => {
              const role = response.role;
              if (role === 'STUDENT') {
                this.isAuthenticated = true;
                this.showStudent = true;
                this.checkIdUser(this.user_name);
                console.log('Authentication successful (STUDENT)');
              } else if (role === 'INSTRUCTOR') {
                this.isAuthenticated = true;
                this.showInstructor = true;
                this.checkIdUser(this.user_name);
                console.log('Authentication successful (INSTRUCTOR)');
              } else if (role === 'ADMIN') {
                this.isAuthenticated = true;
                this.showAdmin = true;
                this.checkIdUser(this.user_name);
                console.log('Authentication successful (ADMIN)');
              } else {
                console.log('Authentication failed (false)');
              }
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            } 
          )
        } else {
          this.authenticationError = 'Wrong username or password';
          setTimeout(() => {
            this.clearErrorMessages();
          }, 2200);
          console.error('Authentication failed (false)');
        }
      },
        (error) => {
          console.error('Error during authentication:', error);
        }
      );
    }

  clearErrorMessages() {
    this.formSubmitted = false;
    this.authenticationError = '';
  }

  register() {
    this.showRegisterForm = true;
    this.hideRegisterForm = true;
  }

  logIn() {
    this.showRegisterForm = false;
    this.hideRegisterForm = false;
  }

  onSubmit2() {
    this.formSubmitted = true;

    function hashString(s: string): number {
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        const char = s.charCodeAt(i);
        hash = (hash << 5) - hash + char;
      }
      return hash;
    }

    if (!this.username || !this.password || !this.email || !this.fullname) {
      setTimeout(() => {
        this.clearErrorMessages();
      }, 2000);
      return; 
    }
    
    const newStudent: Student = {
      username: this.username,
      password: this.password,
      email: this.email,
      full_name: this.fullname
    };
  
    this.userservice.addStudents(newStudent).subscribe(
      (response) => {
        this.logIn();
        this.formSubmitted = false;
        console.log('Student added successfully:', response);
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );

  }

  public checkIdUser(username: String) {
    this.userservice.getId(this.user_name).subscribe(
      (response: any) => {
        this.userId = response.id;
        this.returnId()
        return this.userId;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      } 
    )
  }

  public returnId(): number {
    const studentId: number = this.userId;
    return studentId;
  }


}
