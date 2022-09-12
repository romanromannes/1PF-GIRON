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

  getCourses(): Observable<Course[]> {
    return this.courses$.asObservable();
  }

  deleteCourse(id: string): void {
    this.http.delete<Course>(`${this.url}/courses/${id}`).subscribe((x) => {
      this.courses$.next(this.courses$.getValue().filter((x) => x.id !== id));
    })
  }

  addCourse(course: Course): void {
    this.http.post<Course>(`${this.url}/courses`, course).subscribe((x) => {
      this.courses$.next([...this.courses$.getValue(), x]);
    })
  }

  getCourseById(id: string): Course {
    return this.courses$.getValue().filter((x) => x.id === id)[0];
  }

  editCourse(course: Course): void {
    this.http.put<Course>(`${this.url}/courses/${course.id}`, course).subscribe((x) => {
      this.courses$.next([
        x,
        ...this.courses$.getValue().filter((x) => x.id !== course.id),
      ]);
    })
  }
}
