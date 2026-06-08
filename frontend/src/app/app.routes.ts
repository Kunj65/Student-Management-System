import { Routes } from '@angular/router';
import { StudentDetails } from './components/student-details/student-details';
import { StudentCreate } from './components/student-create/student-create';
import { StudentUpdate } from './components/student-update/student-update';
import { StudentListComponent } from './components/student-list/student-list';
import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { StudentDelete } from './components/student-delete/student-delete';
import { authGuard } from './guards/auth-guard';
import { publicGuard } from './guards/public.guard';
import { StudentOrderByAge } from './components/students-order-by-age/students-order-by-age';
import {StudentSearch} from './components/student-search/student-search'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [publicGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [publicGuard],
  },
  {
    path: 'students',
    component: StudentListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'create',
    component: StudentCreate,
    canActivate: [authGuard],
  },
  {
    path: 'delete',
    component: StudentDelete,
    canActivate: [authGuard],
  },
  {
    path: 'edit/:id',
    component: StudentUpdate,
    canActivate: [authGuard],
  },
  {
    path: 'details/:id',
    component: StudentDetails,
    canActivate: [authGuard],
  },
  {
    path: 'orderbyage',
    component: StudentOrderByAge,
    canActivate: [authGuard],
  },
  {
  path: 'searchstudent',
  component: StudentSearch,
  canActivate: [authGuard]
  }
];
