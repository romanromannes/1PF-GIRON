import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';
import { Inscription } from '../models/inscription';
import { Student } from '../models/student';
import { CoursesService } from './courses.service';
import { StudentsService } from './students.service';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  private url: string = environment.url;
  private inscriptions$ = new BehaviorSubject<Inscription[]>([]);
  constructor(
    private http: HttpClient,
    private studentsService: StudentsService,
    private coursesService: CoursesService
  ) {
    let inscriptionsFromDb: Inscription[];
    this.http
      .get<Inscription[]>(`${this.url}/inscriptions`)
      .subscribe((inscriptions) => {
        inscriptionsFromDb = inscriptions.map((x: Inscription) => {
          return {
            id: x.id,
            student: x.student,
            course: x.course,
          };
        });
        this.inscriptions$.next(inscriptionsFromDb);
      });
  }

  getInscriptions(): Observable<Inscription[]> {
    return this.inscriptions$.asObservable();
  }

  deleteInscription(id: string): void {
    this.http
      .delete<Inscription>(`${this.url}/inscriptions/${id}`)
      .subscribe((x) => {
        this.inscriptions$.next(
          this.inscriptions$.getValue().filter((x) => x.id !== id)
        );
      });
  }

  addInscription(inscription: Inscription): void {
    this.http.post<Inscription>(`${this.url}/inscriptions/`, inscription).subscribe((x) => {
      this.inscriptions$.next([...this.inscriptions$.getValue(), x]);
    })
  }

  getInscriptionById(id: string): Inscription {
    return this.inscriptions$.getValue().filter((x) => x.id === id)[0];
  }

  editInscription(inscription: Inscription): void {
    this.http.put<Inscription>(`${this.url}/inscriptions/${inscription.id}`, inscription).subscribe((x) => {
      this.inscriptions$.next([
        x,
        ...this.inscriptions$.getValue().filter((x) => x.id !== inscription.id),
      ]);
    });
  }

  getStudents(): Observable<Student[]> {
    return this.studentsService.getStudents();
  }

  getCourses(): Observable<Course[]> {
    return this.coursesService.getCourses();
  }
}
