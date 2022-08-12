import { Course } from "./course";
import { Lesson } from "./lesson";
import { Student } from "./student";

export interface AppState {
    students: Student[],
    courses: Course[],
    lessons: Lesson[]
}