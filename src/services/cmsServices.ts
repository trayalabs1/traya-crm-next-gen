import { axiosClient } from "@utils/axiosInterceptor";
import { makerApi } from "src/api";

export const getSegments = async () => {
  const response = await axiosClient.get(makerApi.GET_SEGMENTS);
  return response.data;
};
