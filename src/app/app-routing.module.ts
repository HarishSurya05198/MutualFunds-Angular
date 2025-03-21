import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SchemeDetailsComponent } from './scheme-details/scheme-details.component';
import { InvestmentDetailsComponent } from './investment-details/investment-details.component';
import { AuthGuard } from './guard/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: 'home', component: HomeComponent
},
{
  path: 'details/:sid', component: SchemeDetailsComponent
},
{
  path: 'login', component: LoginComponent
},
{
  path: 'register', component: RegisterComponent
},
{
  path: 'list', component: InvestmentDetailsComponent , canActivate: [AuthGuard]
},
{
  path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]
},
{ path: '', pathMatch: 'full', redirectTo: 'home' },
{ path: '**', pathMatch: 'full', redirectTo: 'home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
