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
} as const;

export const segmentsApi = {
  GET_SEGMENTS: (queryString?: string) => {
    return "/v2/cms/segments" + (queryString ? queryString : "");
  },
  CREATE_SEGMENT: "/v2/cms/segment/create",
  UPDATE_SEGMENT: (id = "segmentId") => "/v2/cms/segment/update/" + id,
} as const;
