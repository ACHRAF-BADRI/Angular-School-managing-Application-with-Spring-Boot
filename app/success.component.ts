import { Component, OnInit } from '@angular/core';
import { CourService } from './cours-service';
import { Cour } from './cours';
import { HttpErrorResponse } from "@angular/common/http";
import { ProgressService } from './progress_service';
import { Progress } from './progress';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit{

  title = 'shoolmanagerapp';
  public cours: Cour[] = [];
  public progresses: Progress[] = [];
  showContent: boolean = false;
  showAllList: boolean = true;
  showContent2: boolean = false;
  selectedButton: number | null = null;
  logOut: boolean = false;
  showCours: boolean = false;
  goback: boolean = false;
  searchOrList: number | null = null;
  courses: Cour[] = [];
  filteredCourses: Cour[] = [];
  filteredProgreses: Progress[] = [];
  searchTerm: string = '';

  constructor(private courService: CourService, private progressService: ProgressService, private appcomponent: AppComponent){}

  ngOnInit(): void {
    this.getCours();
    this.getStudentProgress();
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

  public getStudentProgress(): void {
    this.progressService.getProgress().subscribe(
      (response: Progress | Progress[] | void) => {
        if (Array.isArray(response)) {
          this.filteredProgreses = response.filter(progress => progress.userId === this.appcomponent.returnId());
        } else if (response && response.userId === this.appcomponent.returnId()) {
          this.filteredProgreses = [response];
        } else {
          this.filteredProgreses = [];
          console.error('Unexpected response:', response);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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

  LogOutfunction() {
    this.logOut = true;
    this.showCours = true;
  }

  goBackFunc() {
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

  searchCourses() {
    this.showContent2 = true;
    this.searchOrList = 1;
  }

  listCourses() {
    this.showContent2 = true;
    this.searchOrList = 2;
  }
}
