export interface User {
    id: string;
    userName: string;
    pass: string;
    profile: string; //admin | user
    islogin: boolean; 
}

export interface Login {
    userName: string;
    pass: string;
}