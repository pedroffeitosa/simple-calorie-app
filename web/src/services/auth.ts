import { User } from "../types/User";
import { api } from "./api";

type SignInRequestData = {
  username: string;
  password: string;
};

export async function signInRequest(signInRequestData: SignInRequestData) {
  try {
    const response = await api.post("/auth/login", signInRequestData);
    const { data } = response;
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function recoverUserInformation() {
  try {
    const response = await api.get<User>("/users/profile");
    const { data } = response;
    return data;
  } catch (e) {
    console.error(e);
  }
}
