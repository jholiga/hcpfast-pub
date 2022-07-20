import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { HCPComponent } from './components/hcp/hcp.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'hcp', component: HCPComponent, canActivate: [AuthGuard]},
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
