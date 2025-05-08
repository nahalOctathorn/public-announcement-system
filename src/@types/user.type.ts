import { UserGender } from "@/enums/user.enum";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
};

export type UserData = Omit<User, "id" | "level" | "createdAt" | "updatedAt"> & {
  level: number | undefined;
  gender: UserGender;
  address: string;
  city: string;
  state: string;
  zip: string;
  contactPhone: string;
  llc?: string;
  ect?: string;
};


export type UserWithProfile = User & {
  profile: Omit<UserData, "level" | "firstName" | "lastName"> & {
    id: number;
  };
};

export type UserWithProfileAndPassword = User & {
  password: string;
  profile: Omit<UserData, "level" | "firstName" | "lastName"> & {
    id: number;
  };
};

export type ResetPasswordData = {
  currentPassword: string;
  newPassword: string;
};
