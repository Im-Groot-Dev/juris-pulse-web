
export type Role = "user" | "lawyer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  profileImage: string;
}
