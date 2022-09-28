import { SessionUser } from "src/app/core/models/auth";

export interface AuthState {
  load: boolean;
  sessionUser: SessionUser;
  error: string;
}

