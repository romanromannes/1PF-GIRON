export interface LogIn {
    userName: string;
    pass: string;
}

export interface SignUp {
    userName: string;
    pass: string;
}

export interface SessionUser {
    id: string;
    userName: string;
    pass: string;
    profile: string;
  }