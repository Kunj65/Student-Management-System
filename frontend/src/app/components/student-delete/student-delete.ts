import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { StudentService } from '../../services/student';

import { Router } from '@angular/router';

@Component({
  selector: 'app-student-delete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-delete.html',
  styleUrls: ['./student-delete.css'],
})
export class StudentDelete {
  private studentService = inject(StudentService);

  private router = inject(Router);

  // FIXED TYPE

  studentId!: number;

  successMessage = '';

  errorMessage = '';

  isLoading = false;

  deleteStudentById() {
    this.successMessage = '';

    this.errorMessage = '';

    if (!this.studentId) {
      this.errorMessage = 'Please Enter Student ID';

      return;
    }

    const confirmDelete = confirm(`Are you sure you want to delete student ID ${this.studentId}?`);

    if (!confirmDelete) {
      return;
    }

    this.isLoading = true;

    this.studentService.deleteStudentById(this.studentId).subscribe({
      next: (response: any) => {
        console.log(response);

        this.successMessage = 'Student Deleted Successfully';

        this.studentId = 0;

        this.isLoading = false;

        this.router.navigateByUrl('/students', {
          replaceUrl: true,
        });
      },

      error: (error) => {
        console.log(error);

        this.errorMessage = 'Failed To Delete Student';

        this.isLoading = false;
      },
    });
  }
}
