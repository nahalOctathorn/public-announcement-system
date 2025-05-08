import { apiRequest } from "@/utils/fetcher";
import {
  ResetPasswordData,
  User,
  UserData,
  UserWithProfile,
  UserWithProfileAndPassword,
} from "@/@types/user.type";
import { ListParams, PaginatedResponse } from "@/@types/api.type";
import { Id, MessageResponse } from "@/@types/general.type";

const USERS_API_PATH = "/users";

export const resetPassword = async (data: ResetPasswordData) =>
  apiRequest<MessageResponse>(`${USERS_API_PATH}/reset/password`, "POST", data);

export const updateUser = (params: Id) => (data: UserData) =>
  apiRequest<MessageResponse>(`${USERS_API_PATH}/${params.id}`, "PATCH", data);

export const createUser = (creatorId: number, data: UserData) =>
  apiRequest<UserWithProfileAndPassword>(
    `${USERS_API_PATH}/${creatorId}`,
    "POST",
    data
  );

export const fetchUsers = (params: ListParams, creatorId: number, by = "creator") => {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append("page", params.page.toString());

  if (params.limit) queryParams.append("limit", params.limit.toString());

  if (
    params.filters &&
    typeof params.filters === "object" &&
    Object.keys(params.filters).length > 0
  ) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value.toString());
      }
    });
  }

  return apiRequest<PaginatedResponse<User>>(
    `${USERS_API_PATH}/${by}/${creatorId}?${queryParams.toString()}`,
    "GET"
  );
};

export const fetchUser = (params: Id) =>
  apiRequest<UserWithProfile>(`${USERS_API_PATH}/${params.id}`, "GET");

export const deleteUser = async (id: number): Promise<void> => {
  await apiRequest<void>(`${USERS_API_PATH}/${id}`, "DELETE");
};
