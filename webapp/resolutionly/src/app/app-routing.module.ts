import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GmapsComponent } from './gmaps/gmaps.component';
import { HomeComponent } from './home/home.component';
import { LetterToFutureSelfComponent } from './letter-to-future-self/letter-to-future-self.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'resolutions',
    component: LetterToFutureSelfComponent
  },
  {
    path: 'journal',
    component: DashboardComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'map',
    component: GmapsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
