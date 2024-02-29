import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from './success.component';
import { AdminComponent } from './admin.component';
import { InstuctorComponent } from './instuctor.component';

const routes: Routes = [ 
  { path: 'success', component: SuccessComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'instructor', component: InstuctorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
