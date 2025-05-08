import { User } from "./user.type";

export type AuthUser = Omit<User, "lastName" | "createdAt" | "updatedAt">;
export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ResetPasswordData = {
  newPassword: string;
  token: string;
};

export type SendResetLinkData = {
  email: string;
};

export type LoginResponse = {
  user: User;
  token: string;
  message: string;
};


