import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-student-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-update.html',
  styleUrls: ['./student-update.css'],
})
export class StudentUpdate implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private studentService = inject(StudentService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  studentId!: number;

  studentForm!: FormGroup;

  async ngOnInit(): Promise<void> {
    this.studentForm = this.fb.group({
      first_name: '',
      last_name: '',
      age: '',
      class: '',
    });

    // Wait for auth to resolve before fetching student data
    await this.authService.initializeAuth();

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.studentId = id;

      this.studentService.getStudentById(id).subscribe({
        next: (response: any) => {
          this.studentForm.patchValue({
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            age: response.data.age,
            class: response.data.class,
          });
          // Tell Angular to re-render after await
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  updateStudent() {
    this.studentService.updateStudent(this.studentId, this.studentForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
        this.router.navigate(['/students']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}