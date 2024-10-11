import {
  Contents,
  Content,
  ContentMutationPayload,
  Components,
  Component,
  Segments,
  // SegmentMutationPayload,
  Segment,
  ComponentContentsType,
  SegmentComponentsContentsExpandedType,
  SegmentMutationBody,
  ComponentMutationBody,
} from "cms";
import { axiosClient } from "@utils/axiosInterceptor";
import {
  contentsApi,
  componentsApi,
  segmentsApi,
  OTPApi,
  approvalApi,
  releaseApi,
  mediaApi,
  discardApi,
} from "src/api";
import { EntitiyActionBody } from "cms";
import { AxiosResponse } from "axios";
import { getErrorMessage } from "@utils/common";
import { toast } from "react-toastify";

export const getContents = async (queryString?: string): Promise<Contents> => {
  const response = await axiosClient.get(contentsApi.GET_CONTENTS(queryString));
  return response.data;
};

export const createContent = async (
  data: ContentMutationPayload["payload"],
): Promise<Content[]> => {
  const response = await axiosClient.post(contentsApi.CREATE_CONTENT, {
    ...data,
    user_id: "f7ad2907-c411-40d2-9c56-6cd607eaeeaf",
  });
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
  data: ComponentMutationBody,
): Promise<Components[]> => {
  const response = await axiosClient.post(componentsApi.CREATE_COMPONENT, data);
  return response.data;
};

export const updateComponent = async ({
  id,
  payload,
}: {
  id?: string;
  payload: ComponentMutationBody;
}): Promise<Component> => {
  const response = await axiosClient.put(
    componentsApi.UPDATE_COMPONENT(id),
    payload,
  );
  return response.data;
};

export const getComponentContents = async (
  componentId?: string,
): Promise<ComponentContentsType> => {
  const response = await axiosClient.get(
    componentsApi.GET_COMPONENT_CONTENTS_BY_COMPONENT_ID(componentId),
  );
  return response.data;
};

export const getSegments = async (queryString?: string): Promise<Segments> => {
  const response = await axiosClient.get(segmentsApi.GET_SEGMENTS(queryString));
  return response.data;
};

export const createSegment = async (
  data: SegmentMutationBody,
): Promise<Segment> => {
  const response = await axiosClient.post(segmentsApi.CREATE_SEGMENT, data);
  return response.data;
};

export const updateSegment = async ({
  id,
  payload,
}: {
  id?: string;
  payload: SegmentMutationBody;
}): Promise<Segment> => {
  const response = await axiosClient.put(
    segmentsApi.UPDATE_SEGMENT(id),
    payload,
  );
  return response.data;
};

export const getContentsComponentsFromSegment = async (
  segmentId: string,
  fetchContents = false,
): Promise<SegmentComponentsContentsExpandedType> => {
  const response = await axiosClient.get(
    segmentsApi.GET_CONTENTS_COMPONENTS_FROM_SEGMENT(segmentId, fetchContents),
  );
  return response.data;
};

export const generateOtp = async (
  userId: string,
): Promise<{ status: string; otp: string }> => {
  const response = await axiosClient.get(OTPApi.GENERATE(userId));
  return response.data;
};

export const verifyOtp = async (
  userId: string,
  otp: string,
): Promise<{ isValid: boolean }> => {
  const response: AxiosResponse<{ isValid: boolean }> = await axiosClient.get(
    OTPApi.VERIFY(userId, otp),
  );

  if (!response?.data?.isValid) {
    throw new Error("Invalid OTP");
  }
  return response.data;
};

export const retryOtp = async (
  userId: string,
): Promise<{ status: string; otp: string }> => {
  const response = await axiosClient.get(OTPApi.RETRY(userId));
  return response.data;
};

export const approvalByChecker = async (payload: EntitiyActionBody) => {
  const response = await axiosClient.put(
    approvalApi.APPROVAL_BY_CHECKER,
    payload,
  );
  return response.data;
};

export const approvalByPublisher = async (payload: EntitiyActionBody) => {
  const response = await axiosClient.put(
    approvalApi.APPROVAL_BY_PUBLISHER,
    payload,
  );
  return response.data;
};

export const publishByPublisher = async (payload: EntitiyActionBody) => {
  const response = await axiosClient.put(releaseApi.PUBLISH, payload);
  return response.data;
};

export const submitByChecker = async (payload: EntitiyActionBody) => {
  const response = await axiosClient.put(releaseApi.SUBMIT, payload);
  return response.data;
};

export const getComponentsBulk = async ({
  componentIds,
}: {
  componentIds: string[];
}) => {
  const response = await axiosClient.post(
    componentsApi.GET_COMPONENTS_BULK_BY_COMPONENT_IDS,
    { componentIds },
  );
  return response.data;
};

export const getContentsBulk = async ({
  contentIds,
}: {
  contentIds: string[];
}) => {
  const response = await axiosClient.post(
    contentsApi.GET_CONTENTS_BULK_BY_CONTENT_IDS,
    { contentIds },
  );
  return response.data;
};

export const uploadMedia = async (file: File) => {
  try {
    const form = new FormData();
    form.append("file", file);
    const response = await axiosClient.post(mediaApi.UPLOAD, form);
    return response.data;
  } catch (error) {
    toast.error(getErrorMessage(error));
    return error;
  }
};

export const discard = async (data: object) => {
  const response = await axiosClient.post(discardApi.DISCARD, data);
  return response.data;
};
