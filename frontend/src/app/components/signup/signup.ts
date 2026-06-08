import { Component, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class SignupComponent {
  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  private router = inject(Router);

  signupForm = this.fb.group({
    username: '',

    email: '',

    password: '',
  });

  signupUser() {
    this.authService.signup(this.signupForm.value).subscribe({
      next: (response: any) => {
        console.log(response);

        // Use replaceUrl to prevent going back to signup page
        this.router.navigateByUrl('/login', { replaceUrl: true });
      },

      error: (error) => {
        console.log(error);
      },
    });
  }
}
