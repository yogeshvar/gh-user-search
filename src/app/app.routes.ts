import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Search User' },
  {
    path: 'details/:username',
    component: DetailsComponent,
    title: 'User Info',
  },
  {
    path: '**',
    redirectTo: '',
    component: NotfoundComponent,
    title: 'Not Found',
  },
];
