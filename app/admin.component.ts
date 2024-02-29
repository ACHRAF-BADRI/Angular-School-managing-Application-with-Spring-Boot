import { Component, OnInit } from '@angular/core';
import { CourService } from './cours-service';
import { Cour } from './cours';
import { HttpErrorResponse } from "@angular/common/http";
import { ProgressService } from './progress_service';
import { Progress } from './progress';
import { UserService } from './user.service';
import { User } from './user';
import { User2 } from './user2';
import { Cour2 } from './cour2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  authenticationError: string = '';
  name: string = '';
  prof: string = '';
  username: string = '';
  password: string = '';
  email: string = '';
  fullname: string = '';
  role: string = '';
  formSubmitted: boolean = false;
  title = 'shoolmanagerapp';
  public cours: Cour[] = [];
  public cours2: Cour2[] = [];
  public instructors: User[] = [];
  public delStudentsL: User2[] = [];
  public delInstrsL: User2[] = [];
  public delAdminsL: User2[] = [];
  public students: User[] = [];
  public admins: User[] = [];
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
  filteredInstructores: User[] = [];
  filteredStudents: User[] = [];
  filteredAdmins: User[] = [];
  searchTerm: string = '';
  showTheAddStdForm: boolean = false;
  showTheAddInstrForm: boolean = false;
  showTheAddADminForm: boolean = false;
  showTheStdList: boolean = false;
  showTheInstrList: boolean = false;
  showTheAdminsList: boolean = false;
  shocDelStdList: number | null = null;

  constructor(private courService: CourService, private progressService: ProgressService, private userService: UserService){}

  ngOnInit(): void {
    this.getCours();
    this.getStudents();
    this.getInstructors();
    this.getAdmins();
    this.getProgress();
    this.getStudentsDelList();
    this.getInstrsDelList();
    this.getAdminsDelList();
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

  public getAdmins(): void {
    this.userService.getUsersByRole("ADMIN").subscribe(
      (response: User[]) => {
        this.filteredAdmins = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getInstructors(): void {
    this.userService.getUsersByRole("INSTRUCTOR").subscribe(
      (response: User[]) => {
        this.filteredInstructores = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getStudentsDelList(): void {
    this.userService.getUsersByRole2("STUDENT").subscribe(
      (response: User2[]) => {
        this.delStudentsL = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getInstrsDelList(): void {
    this.userService.getUsersByRole2("INSTRUCTOR").subscribe(
      (response: User2[]) => {
        this.delInstrsL = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAdminsDelList(): void {
    this.userService.getUsersByRole2("ADMIN").subscribe(
      (response: User2[]) => {
        this.delAdminsL = response;
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

  addStudent() {
    this.formSubmitted = true;

    if (!this.username || !this.password || !this.email || !this.fullname) {
      setTimeout(() => {
        this.clearErrorMessages();
      }, 2000);
      return; 
    }
    
    const newUser: User = {
      username: this.username,
      password: this.password,
      email: this.email,
      role: 'STUDENT',
      full_name: this.fullname
    };
  
    this.userService.addUsers(newUser).subscribe(
      (response) => {
        this.formSubmitted = false;
        console.log('Student added successfully:', response);
        this.getStudents();
        this.goBackFunc();
        this.getStudentsDelList();
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }

  addInstuctor() {
    this.formSubmitted = true;

    if (!this.username || !this.password || !this.email || !this.fullname) {
      setTimeout(() => {
        this.clearErrorMessages();
      }, 2000);
      return; 
    }
    
    const newUser: User = {
      username: this.username,
      password: this.password,
      email: this.email,
      role: 'INSTRUCTOR',
      full_name: this.fullname
    };
  
    this.userService.addUsers(newUser).subscribe(
      (response) => {
        this.formSubmitted = false;
        console.log('Instuctor added successfully:', response);
        this.getInstructors();
        this.getInstrsDelList();
        this.goBackFunc();
      },
      (error) => {
        console.error('Error adding instuctor:', error);
      }
    );
  }

  addAdmin() {
    this.formSubmitted = true;

    if (!this.username || !this.password || !this.email || !this.fullname) {
      setTimeout(() => {
        this.clearErrorMessages();
      }, 2000);
      return; 
    }
    
    const newUser: User = {
      username: this.username,
      password: this.password,
      email: this.email,
      role: 'ADMIN',
      full_name: this.fullname
    };
  
    this.userService.addUsers(newUser).subscribe(
      (response) => {
        this.formSubmitted = false;
        console.log('Admin added successfully:', response);
        this.getAdmins();
        this.getAdminsDelList();
        this.goBackFunc();
      },
      (error) => {
        console.error('Error adding admin:', error);
      }
    );
  }

  deleteUser (userId: number): void {
    this.userService.deleteUsers(userId).subscribe(
      () => {
        this.shocDelStdList = 0;
        console.log('Student deleted successfully');
        this.getAdmins();
        this.getInstructors();
        this.getStudents();
        this.getStudentsDelList();
        this.getAdminsDelList();
        this.getInstrsDelList();
        this.goBackFunc();
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.getAdmins();
        this.getInstructors();
        this.getStudents();
        this.getStudentsDelList();
        this.getAdminsDelList();
        this.getInstrsDelList();
        this.goBackFunc();
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
    this.showTheAddStdForm = true;
  }

  AddInstructor() {
    this.showTheInstrList = true;
    this.showTheAddInstrForm = true;
  }

  AddAdmin() {
    this.showTheAdminsList = true;
    this.showTheAddADminForm = true;
  }

  LogOutfunction() {
    this.logOut = true;
    this.showCours = true;
  }

  goBackFunc() {  
    this.username = '';
    this.password = '';
    this.email = '';
    this.fullname = '';
    this.showTheAdminsList = false;
    this.showTheAddADminForm = false;
    this.showTheInstrList = false;
    this.showTheAddInstrForm = false;
    this.showTheStdList = false;
    this.showTheAddStdForm = false;
    this.showContent = false;
    this.selectedButton = 0;
    this.shocDelStdList = 0;
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

  delStd (){
    this.showTheStdList = true;
    this.shocDelStdList = 1;
  }

  delInstr (){
    this.showTheInstrList = true;
    this.shocDelStdList = 1;
  }

  delAdmn (){
    this.showTheAdminsList = true;
    this.shocDelStdList = 1;
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
