import { Component, inject } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar';

import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [RouterOutlet, NavbarComponent],

  templateUrl: './app.html',

  styleUrls: ['./app.css'],
})
export class App {
  private authService = inject(AuthService);

  isAuthenticated = false;

  constructor() {
    this.authService.authStatus$.subscribe({
      next: (value) => {
        this.isAuthenticated = value === true; 
      },
    });
  }
}
