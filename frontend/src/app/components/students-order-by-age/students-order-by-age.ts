import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-students-order-by-age',
  imports: [CommonModule],
  templateUrl: './students-order-by-age.html',
  styleUrl: './students-order-by-age.css',
})
export class StudentOrderByAge implements OnInit { 
  private studentService = inject(StudentService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  students: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  async ngOnInit(): Promise<void> {
    await this.authService.initializeAuth();
    this.getStudents();
  }

  getStudents() {
    this.studentService.orderByAge().subscribe({
      next: (response: any) => {
        this.students = response.data;
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
