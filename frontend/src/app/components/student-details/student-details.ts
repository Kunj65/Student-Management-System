import { Component, inject, ChangeDetectorRef } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-details.html',
  styleUrls: ['./student-details.css'],
})
export class StudentDetails {
  private studentService = inject(StudentService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  studentId!: number;
  student: any = null;
  errorMessage = '';

  async getStudentById() {
    if (!this.studentId) {
      this.errorMessage = 'Please Enter Student ID';
      return;
    }

    await this.authService.initializeAuth();

    this.studentService.getStudentById(this.studentId).subscribe({
      next: (response: any) => {
        this.student = response.data;
        this.errorMessage = '';
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log(error);
        this.student = null;
        this.errorMessage = 'Student Not Found';
        this.cdr.detectChanges();
      },
    });
  }
}
