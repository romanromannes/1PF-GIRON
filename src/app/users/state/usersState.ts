import { User } from "src/app/core/models/auth";

export interface UsersState {
    load: boolean,
    users: User[],
    error: string,
}