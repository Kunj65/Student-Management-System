import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { StudentService } from '../../services/student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-create.html',
  styleUrl: './student-create.css',
})
export class StudentCreate {
  private fb = inject(FormBuilder);

  private router = inject(Router);

  private studentService = inject(StudentService);

  studentForm = this.fb.group({
    first_name: ['', Validators.required],

    last_name: ['', Validators.required],

    age: ['', Validators.required],

    class: ['', Validators.required],
  });

  createStudent() {
    if (this.studentForm.invalid) {
      return;
    }

    console.log(this.studentForm.value);

    this.studentService.createStudent(this.studentForm.value).subscribe({
      next: (response) => {
        console.log(response);

        this.studentForm.reset();

        alert('Student Created Successfuly');

        this.router.navigateByUrl('/students', {
          replaceUrl: true,
        });
      },

      error: (error) => {
        console.log(error);
      },
    });
  }
}
