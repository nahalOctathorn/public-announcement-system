import { apiRequest } from "@/utils/fetcher";
import {
  AuthUser,
  LoginData,
  LoginResponse,
  RegisterData,
  ResetPasswordData,
  SendResetLinkData,
} from "@/@types/auth.type";
import { MessageResponse } from "@/@types/general.type";

const AUTH_API_PATH = "/auth";

export const me = async () =>
  apiRequest<AuthUser>(`${AUTH_API_PATH}/me`, "GET");

export const login = async (data: LoginData) =>
  apiRequest<LoginResponse>(`${AUTH_API_PATH}/login`, "POST", data, undefined);

export const register = async (data: RegisterData) =>
  apiRequest<any>(`${AUTH_API_PATH}/register`, "POST", data, undefined);

export const logout = async () =>
  apiRequest<MessageResponse>(`${AUTH_API_PATH}/logout`, "POST", undefined);

export const resetPassword = async (data: ResetPasswordData) =>
  apiRequest<MessageResponse>(`${AUTH_API_PATH}/reset-password`, "POST", data, undefined);

export const sendResetLink = async (data: SendResetLinkData) =>
  apiRequest<MessageResponse>(`${AUTH_API_PATH}/forgot-password`, "POST", data, undefined);
