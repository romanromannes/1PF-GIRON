import { User } from "src/app/core/models/user";

export interface UsersState {
    load: boolean,
    users: User[],
    error: string,
}