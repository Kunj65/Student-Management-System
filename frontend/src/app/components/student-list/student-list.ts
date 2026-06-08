import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentListComponent implements OnInit { 
  private studentService = inject(StudentService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  students: any[] = [];
  currentPage = 1;
  itemsPerPage = 15;

  async ngOnInit(): Promise<void> {
    await this.authService.initializeAuth();
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().subscribe({
      next: (response: any) => {
        this.students = response.data;
        // Tell Angular to re-check and update the UI
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  get paginatedStudents() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.students.slice(startIndex, startIndex + this.itemsPerPage);
  }

  deleteStudent(id: number) {
    this.students = this.students.filter((s) => s.id !== id);

    const totalPages = Math.ceil(this.students.length / this.itemsPerPage);
    if (this.currentPage > totalPages && totalPages > 0) {
      this.currentPage = totalPages;
    }

    this.cdr.detectChanges();
    
    this.studentService.deleteStudentById(id).subscribe({
      next: () => {},
      error: () => {
        this.getStudents();
      },
    });
  }

  updateStudent(id: number) {
    this.router.navigate(['/edit', id]);
  }

  nextPage() {
    const totalPages = Math.ceil(this.students.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
