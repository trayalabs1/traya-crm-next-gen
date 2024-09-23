import {
  Contents,
  Content,
  ContentMutationPayload,
  Components,
  ComponentMutationPayload,
  Component,
} from "cms";
import { axiosClient } from "@utils/axiosInterceptor";
import { contentsApi, componentsApi } from "src/api";

export const getContents = async (queryString?: string): Promise<Contents> => {
  const response = await axiosClient.get(contentsApi.GET_CONTENTS(queryString));
  return response.data;
};

export const createContent = async (
  data: ContentMutationPayload["payload"],
): Promise<Content[]> => {
  const response = await axiosClient.post(contentsApi.CREATE_CONTENT, data);
  return response.data;
};

export const updateContent = async ({
  id,
  payload,
}: ContentMutationPayload): Promise<Content> => {
  const response = await axiosClient.put(contentsApi.UPDATE_CONTENT(id), {
    data: payload,
  });
  return response.data;
};

export const getComponents = async (
  queryString?: string,
): Promise<Components> => {
  const response = await axiosClient.get(
    componentsApi.GET_COMPONENTS(queryString),
  );
  return response.data;
};

export const createComponent = async (
  data: ComponentMutationPayload["payload"],
): Promise<Components[]> => {
  const response = await axiosClient.post(componentsApi.CREATE_COMPONENT, data);
  return response.data;
};

export const updateComponent = async ({
  id,
  payload,
}: ComponentMutationPayload): Promise<Component> => {
  const response = await axiosClient.put(
    componentsApi.UPDATE_COMPONENT(id),
    payload,
  );
  return response.data;
};
