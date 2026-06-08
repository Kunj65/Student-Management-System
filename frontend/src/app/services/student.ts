import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private http = inject(HttpClient);

  private API_URL = environment.API_URL;

  getStudents() {
    return this.http.get(
      `${this.API_URL}/handleGetStudent`,

      {
        withCredentials: true,
      },
    );
  }
  createStudent(data: any) {
    return this.http.post(
      `${environment.API_URL}/handleCreateNewStudent`,

      data,

      {
        withCredentials: true,
      },
    );
  }
  getStudentById(id: number) {
    return this.http.get(
      `${this.API_URL}/handleGetStudentById/${id}`,

      {
        withCredentials: true,
      },
    );
  }
  deleteStudentById(id: number) {
    return this.http.delete(`${this.API_URL}/handleDeleteStudent/${id}`, {
      withCredentials: true,
    });
  }
  updateStudent(id: number, data: any) {
    return this.http.patch(
      `${this.API_URL}/handleUpdateStudent/${id}`,

      data,

      {
        withCredentials: true,
      },
    );
  }
  orderByAge() {
    return this.http.get(
      `${this.API_URL}/handleStudentOrderByAge`,
      {
        withCredentials: true,
      },
    );
  }
  fetchStudentWithName(
  first_name: string
) {

  return this.http.get(

    `${this.API_URL}/handleFetchStudentWithName/${first_name}`,

    {
      withCredentials: true
    }

  );

}
}
