import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-student-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-search.html',
  styleUrls: ['./student-search.css'],
})
export class StudentSearch {
  private studentService = inject(StudentService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  first_name = '';
  students: any[] = [];
  errorMessage = '';

  async searchStudent() {
    if (!this.first_name.trim()) {
      this.errorMessage = 'Please Enter Student Name';
      this.students = [];
      return;
    }

    // Wait for auth before calling API
    await this.authService.initializeAuth();
    // No await on Observable — just subscribe directly
    this.studentService.fetchStudentWithName(this.first_name).subscribe({
      next: (response: any) => {
        this.students = response.data;
        this.errorMessage = '';
        this.cdr.detectChanges();
      },
      error: () => {
        this.students = [];
        this.errorMessage = 'Student Not Found';
        this.cdr.detectChanges();
      },
    });
  }
}
