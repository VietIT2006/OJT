export type UserRole = "candidate" | "business" | "admin";

export interface User {
    id: string;
    email: string;
    role: UserRole;
    password: string;
    created_at: string;
}