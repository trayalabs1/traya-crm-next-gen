export const makerApi = {
  GET_SEGMENTS: "/todos/1",
};

export const contentsApi = {
  GET_CONTENTS: (queryString?: string) => {
    return "/v2/cms/contents" + (queryString ? queryString : "");
  },
  CREATE_CONTENT: "/v2/cms/content/create",
  UPDATE_CONTENT: (contentId: string | undefined) =>
    "/v2/cms/content/update/" + contentId,
  GET_CONTENTS_BULK_BY_CONTENT_IDS: "api/content/content/bulk",
} as const;

export const componentsApi = {
  GET_COMPONENTS: (queryString?: string) => {
    return "/v2/cms/components" + (queryString ? queryString : "");
  },
  CREATE_COMPONENT: "/v2/cms/component/create",
  UPDATE_COMPONENT: (componentId: string | undefined) =>
    "/v2/cms/component/update/" + componentId,
  GET_COMPONENT_CONTENTS_BY_COMPONENT_ID: (componentId?: string) =>
    "/v2/cms/component/content/" + componentId,
  GET_COMPONENTS_BULK_BY_COMPONENT_IDS: "/api/component/content/bulk",
} as const;

export const segmentsApi = {
  GET_SEGMENTS: (queryString?: string) => {
    return "/v2/cms/segments" + (queryString ? queryString : "");
  },
  CREATE_SEGMENT: "/v2/cms/segment/create",
  UPDATE_SEGMENT: (id = "segmentId") => "/v2/cms/segment/update/" + id,
  GET_CONTENTS_COMPONENTS_FROM_SEGMENT: (
    segmentId: string,
    fetchContents: boolean,
  ) => `v2/cms/segment/component/content/${segmentId}/${fetchContents}`,
} as const;

export const OTPApi = {
  GENERATE: (userId: string) => `/v2/cms/otp/generate/${userId}`,
  VERIFY: (userId: string, otp: string) =>
    `/v2/cms/otp/validate/${userId}/${otp}`,
  RETRY: (userId: string) => `/v2/cms/otp/retry/${userId}`,
} as const;

export const approvalApi = {
  APPROVAL_BY_CHECKER: "/api/approve/approvalByChecker",
  APPROVAL_BY_PUBLISHER: "/api/approve/approvalByPublisher",
};

export const releaseApi = {
  SUBMIT: "/api/submit",
  PUBLISH: "/api/publish",
};

export const mediaApi = {
  UPLOAD: "/v2/cms/s3/upload",
};

export const discardApi = {
  DISCARD: "/api/discard",
};
