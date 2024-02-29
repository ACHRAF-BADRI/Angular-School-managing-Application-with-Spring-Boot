import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { UserService } from './user.service';
import { SuccessComponent } from './success.component';
import { CourService } from './cours-service';
import { ProgressService } from './progress_service';
import { AdminComponent } from './admin.component';
import { InstuctorComponent } from './instuctor.component';

@NgModule({
  declarations: [
    AppComponent,
    SuccessComponent,
    AdminComponent,
    InstuctorComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    UserService,
    CourService,
    ProgressService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
