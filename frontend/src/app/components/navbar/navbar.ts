import { Component, inject } from '@angular/core';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',

  standalone: true,

  imports: [RouterLink, RouterLinkActive],

  templateUrl: './navbar.html',

  styleUrls: ['./navbar.css'],
})
export class NavbarComponent {
  private router = inject(Router);

  private authService = inject(AuthService);

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
