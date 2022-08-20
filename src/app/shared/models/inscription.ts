import { Course } from "./course";
import { Student } from "./student";

export interface Inscription {
    id:string;
    studentId:string;
    courseId:string;
}

export interface InscriptionVM {
    id:string;
    student:Student;
    course:Course;
}