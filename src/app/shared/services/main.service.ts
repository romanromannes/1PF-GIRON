import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from '../models/appState';
import { Course } from '../models/course';
import { courses, lessons, students } from '../models/data-fake';
import { Lesson } from '../models/lesson';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private appState$ = new BehaviorSubject<AppState>({
    students: students,
    courses: courses,
    lessons: lessons,
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
      lessons: state.lessons,
    });
  }

  addStudent(student: Student): void {
    let state = this.appState$.getValue();
    let students = [...state.students, student];
    this.appState$.next({
      students: students,
      courses: state.courses,
      lessons: state.lessons,
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
      lessons: state.lessons,
    });
  }

  deleteCourse(id: string): void {
    let state = this.appState$.getValue();
    let courses = state.courses.filter((x) => x.id !== id);
    this.appState$.next({
      students: state.students,
      courses: courses,
      lessons: state.lessons,
    });
  }

  addCourse(course: Course): void {
    let state = this.appState$.getValue();
    let courses = [...state.courses, course];
    this.appState$.next({
      students: state.students,
      courses: courses,
      lessons: state.lessons,
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
      lessons: state.lessons,
    });
  }

  deleteLesson(id: string): void {
    let state = this.appState$.getValue();
    let lessons = state.lessons.filter((x) => x.id !== id);
    this.appState$.next({
      students: state.students,
      courses: state.courses,
      lessons: lessons,
    });
  }

  addLesson(lesson: Lesson): void {
    let state = this.appState$.getValue();
    let lessons = [
      ...state.lessons,
      {
        id: lesson.id,
        courseId: lesson.courseId,
        studentId: lesson.studentId,
      },
    ];
    this.appState$.next({
      students: state.students,
      courses: state.courses,
      lessons: lessons,
    });
  }
}
