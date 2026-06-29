import { api } from "../lib/axios";


export type RegisterPayload = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export async function registerUser(payload: RegisterPayload) {
  const response = await api.post("/auth/register", payload);
  return response.data;
}

export const logoutUser = async(refreshToken : string) => {
  return api.post("/auth/logout", {refresh_token : refreshToken,});
};