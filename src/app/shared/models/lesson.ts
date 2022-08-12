import { Course } from "./course";
import { Student } from "./student";

export interface Lesson {
    id:string;
    studentId:string;
    courseId:string;
}

export interface LessonVM {
    id:string;
    student:Student;
    course:Course;
}