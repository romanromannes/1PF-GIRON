import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from '../models/appState';
import { Course } from '../models/course';
import { courses } from '../models/data-fake';
import { Inscription } from '../models/inscription';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private appState$ = new BehaviorSubject<AppState>({
    students: [],
    courses: courses,
    inscriptions: [],
  });
  constructor() {}

  getAppState(): Observable<AppState> {
    return this.appState$.asObservable();
  }

  deleteStudent(id: string): void {
    let state = this.appState$.getValue();
    let students = state.students.filter((x) => x.id !== id);
    this.appState$.next({
      students: students,
      courses: state.courses,
      inscriptions: state.inscriptions,
    });
  }

  addStudent(student: Student): void {
    let state = this.appState$.getValue();
    let students = [...state.students, student];
    this.appState$.next({
      students: students,
      courses: state.courses,
      inscriptions: state.inscriptions,
    });
  }

  getStudentById(id: string): Student {
    return this.appState$.getValue().students.filter((x) => x.id === id)[0];
  }

  editStudent(student: Student): void {
    let state = this.appState$.getValue();
    let students = state.students.filter((x) => x.id !== student.id);
    this.appState$.next({
      students: [student, ...students],
      courses: state.courses,
      inscriptions: state.inscriptions,
    });
  }

  deleteCourse(id: string): void {
    let state = this.appState$.getValue();
    let courses = state.courses.filter((x) => x.id !== id);
    this.appState$.next({
      students: state.students,
      courses: courses,
      inscriptions: state.inscriptions,
    });
  }

  addCourse(course: Course): void {
    let state = this.appState$.getValue();
    let courses = [...state.courses, course];
    this.appState$.next({
      students: state.students,
      courses: courses,
      inscriptions: state.inscriptions,
    });
  }

  getCoursesById(id: string): Course {
    return this.appState$.getValue().courses.filter((x) => x.id === id)[0];
  }

  editCourse(course: Course): void {
    let state = this.appState$.getValue();
    let courses = state.courses.filter((x) => x.id !== course.id);
    this.appState$.next({
      students: state.students,
      courses: [course, ...courses],
      inscriptions: state.inscriptions,
    });
  }

  deleteInscription(id: string): void {
    let state = this.appState$.getValue();
    let inscriptions = state.inscriptions.filter((x) => x.id !== id);
    this.appState$.next({
      students: state.students,
      courses: state.courses,
      inscriptions: inscriptions,
    });
  }

  addInscription(inscription: Inscription): void {
    let state = this.appState$.getValue();
    let inscriptions = [
      ...state.inscriptions,
      {
        id: inscription.id,
        courseId: inscription.courseId,
        studentId: inscription.studentId,
      },
    ];
    this.appState$.next({
      students: state.students,
      courses: state.courses,
      inscriptions: inscriptions,
    });
  }
}
