import { Component, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, RouterLink],

  templateUrl: './login.html',

  styleUrls: ['./login.css'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  private router = inject(Router);

  loginForm = this.fb.group({
    email: '',

    password: '',
  });

  loginUser() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl(
          '/students',

          {
            replaceUrl: true,
          },
        );
      },

      error: (error) => {
        console.log(error);
      },
    });
  }
}
