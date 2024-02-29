import { Component, OnInit } from '@angular/core';
import { CourService } from './cours-service';
import { Cour } from './cours';
import { HttpErrorResponse } from "@angular/common/http";
import { ProgressService } from './progress_service';
import { Progress } from './progress';
import { UserService } from './user.service';
import { User } from './user';
import { Cour2 } from './cour2';

@Component({
  selector: 'app-instuctor',
  templateUrl: './instuctor.component.html',
  styleUrls: ['./instuctor.component.css']
})
export class InstuctorComponent implements OnInit{

  authenticationError: string = '';
  name: string = '';
  prof: string = '';
  formSubmitted: boolean = false;
  title = 'shoolmanagerapp';
  public cours: Cour[] = [];
  public cours2: Cour2[] = [];
  public progresses: Progress[] = [];
  showContent: boolean = false;
  showAllList: boolean = true;
  showContent2: boolean = false;
  selectedButton: number | null = null;
  logOut: boolean = false;
  showCours: boolean = false;
  searchOrList: number | null = null;
  filteredCourses: Cour[] = [];
  filteredStudents: User[] = [];
  searchTerm: string = '';
  showTheStdList: boolean = false;

  constructor(private courService: CourService, private progressService: ProgressService, private userService: UserService){}

  ngOnInit(): void {
    this.getCours();
    this.getStudents();
    this.getProgress();
  }

  public getCours(): void {
    this.courService.getCours().subscribe(
      (response: Cour[]) => {
        this.cours = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getCours2(): void {
    this.courService.getCours2().subscribe(
      (response: Cour2[]) => {
        this.cours2 = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getStudents(): void {
    this.userService.getUsersByRole("STUDENT").subscribe(
      (response: User[]) => {
        this.filteredStudents = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onSearch() {
    if (this.searchTerm == '' || this.searchTerm.trim() === '') {
      this.showAllList = true;
      this.courService.getCours().subscribe(
        (response: Cour[]) => {
          this.cours = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    } else {
      this.showAllList = false;
      this.courService.getCoursByName(this.searchTerm).subscribe(
        (response: Cour | Cour[] | void) => {
          if (Array.isArray(response)) {
            const uniqueCourseIds = new Set<number>();
            this.filteredCourses = response.filter(course => {
              if (!uniqueCourseIds.has(course.id)) {
                uniqueCourseIds.add(course.id);
                return true;
              }
              return false;
            });
          } else if (response) {
            this.filteredCourses = [response];
          } else {
            this.filteredCourses = [];
            console.error('Unexpected response:', response);
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public getProgress(): void {
    this.progressService.getProgress().subscribe(
      (response: Progress[]) => {
        this.progresses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  addCours() {
    this.formSubmitted = true;

    if (!this.name || !this.prof) {
      setTimeout(() => {
        this.clearErrorMessages();
      }, 2000);
      return; 
    }
    
    const newCour: Cour2 = {
      name: this.name,
      prof: this.prof
    };
  
    this.courService.addCours2(newCour).subscribe(
      (response) => {
        this.searchOrList = 0;
        console.log('Cour added successfully:', response);
        this.getCours();
        this.goBackFunc();
      },
      (error) => {
        console.error('Error adding Cour:', error);
      }
    );
  }

  deleteCour (courId: number): void {
    this.courService.deleteCours(courId).subscribe(
      () => {
        this.searchOrList = 0;
        console.log('Cour deleted successfully');
        this.getCours();
        this.goBackFunc();
      },
      (error) => {
        console.error('Error deleting Cour:', error);
        this.getCours();
        this.goBackFunc();
      }
    );
  }


  clearErrorMessages() {
    this.formSubmitted = false;
    this.authenticationError = '';
  }

  AddStd() {
    this.showTheStdList = true;
  }

  LogOutfunction() {
    this.logOut = true;
    this.showCours = true;
  }

  goBackFunc() { 
    this.name = '';
    this.prof = '';
    this.showTheStdList = false;
    this.showContent = false;
    this.selectedButton = 0;
    this.searchOrList = null;
  }

  showButton1() {
    this.showContent = true;
    this.selectedButton = 1;
    this.showContent2 = false;
  }

  showButton2() {
    this.showContent = true;
    this.selectedButton = 2;
  }

  showButton3() {
    this.showContent = true;
    this.selectedButton = 3;
  }

  showButton4() {
    this.showContent = true;
    this.selectedButton = 4;
  }
  
  showButton5() {
    this.showContent = true;
    this.selectedButton = 5;
  }

  searchCourses() {
    this.showContent2 = true;
    this.searchOrList = 1;
  }

  listCourses() {
    this.showContent2 = true;
    this.searchOrList = 2;
  }

  addCourse() {
    this.showContent2 = true;
    this.searchOrList = 3;
  }
}
