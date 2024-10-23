import { userApi } from "@api/userApi";
import { axiosClient } from "@utils/axiosInterceptor";
import { Profile } from "user";

export const getProfile = async (): Promise<Profile> => {
  const response = await axiosClient.get(userApi.PROFILE);
  return response.data;
};
