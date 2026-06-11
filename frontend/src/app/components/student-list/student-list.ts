import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student';
import { AuthService } from '../../services/auth';
(pdfMake as any).vfs = (pdfFonts as any).vfs

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
  itemsPerPage = 10;

  async ngOnInit(): Promise<void> {
    await this.authService.initializeAuth();
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().subscribe({
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
    if (this.currentPage < totalPages) this.currentPage++;
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  // EXPORT PDF
exportPDF() {
  const docDefinition: any = {
    content: [
      {
        text: 'Student Management System',
        style: 'header',
      },
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*', 'auto', 'auto'],
          body: [
            ['ID', 'First Name', 'Last Name', 'Age', 'Class'],
            ...this.students.map((s) => [
              s.id,
              s.first_name,
              s.last_name,
              s.age,
              s.class,
            ]),
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 20,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 20],
      },
    },
  };

  pdfMake.createPdf(docDefinition).download('students-list.pdf');
}

  // EXPORT EXCEL
exportExcel() {
  const excelData = this.students.map((s) => ({
    ID: s.id,
    'First Name': s.first_name,
    'Last Name': s.last_name,
    Age: s.age,
    Class: s.class,
  }));

  const worksheet: XLSX.WorkSheet =
    XLSX.utils.json_to_sheet(excelData);

  const workbook: XLSX.WorkBook = {
    Sheets: {
      Students: worksheet,
    },
    SheetNames: ['Students'],
  };

  XLSX.writeFile(workbook, 'Student_Management_System.xlsx');
}
}
