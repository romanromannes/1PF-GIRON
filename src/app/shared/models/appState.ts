import { Course } from "./course";
import { Inscription } from "./inscription";
import { Student } from "./student";

export interface AppState {
    students: Student[],
    courses: Course[],
    inscriptions: Inscription[]
}