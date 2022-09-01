import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private url: string = environment.url;
  private courses$ = new BehaviorSubject<Course[]>([]);
  
  constructor(private http: HttpClient) {
    let coursesFromDb: Course[];
    this.http.get<Course[]>(`${this.url}/courses`).subscribe((courses) => {
      coursesFromDb = courses.map((course: Course) => {
        return {
          id: course.id,
          name: course.name,
        };
      });
      
      this.courses$.next(coursesFromDb);
    });
  }

  getStudents(): Observable<Course[]> {
    return this.courses$.asObservable();
  }

  deleteStudent(id: string): void {
    const courses = this.courses$.getValue().filter((x) => x.id !== id);
    this.courses$.next(courses);
  }

  addStudent(course: Course): void {
    this.courses$.next([...this.courses$.getValue(), course]);
  }

  getStudentById(id: string): Course {
    return this.courses$.getValue().filter((x) => x.id === id)[0];
  }

  editStudent(course: Course): void {
    this.courses$.next([
      course,
      ...this.courses$.getValue().filter((x) => x.id !== course.id),
    ]);
  }
}
