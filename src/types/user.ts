import type { Timestamp } from "firebase/firestore";

export type UserRole = "admin" | "writer" | "manager";
export type NullableUserRole = UserRole | null;

export type AppUser = {
  id: string;
  email: string;
  role: NullableUserRole;
  lastLoginAt?: Timestamp;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};
