import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private url: string = environment.apiUrl;
  private students$ = new BehaviorSubject<Student[]>([]);

  constructor(private http: HttpClient) {
    let studentsFromDb: Student[];
    this.http.get<Student[]>(`${this.url}/students`).subscribe((students) => {
      studentsFromDb = students.map((student: Student) => {
        return {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          pic: student.pic,
        };
      });
      this.students$.next(studentsFromDb);
    });
  }

  getStudents(): Observable<Student[]> {
    return this.students$.asObservable();
  }

  deleteStudent(id: string): void {
    this.http.delete<Student>(`${this.url}/students/${id}`).subscribe({
      next: (st) => {
        this.students$.next(
          this.students$.getValue().filter((x) => x.id !== id)
        );
      },
    });
  }

  addStudent(student: Student): void {
    this.http.post<Student>(`${this.url}/students/`, student).subscribe({
      next: (st) => {
        this.students$.next([...this.students$.getValue(), st]);
      },
    });
  }

  getStudentById(id: string): Student {
    return this.students$.getValue().filter((x) => x.id === id)[0];
  }

  editStudent(student: Student): void {
    this.http
      .put<Student>(`${this.url}/students/${student.id}`, student)
      .subscribe({
        next: (st) => {
          this.students$.next([
            st,
            ...this.students$.getValue().filter((x) => x.id !== st.id),
          ]);
        },
      });
  }
}
