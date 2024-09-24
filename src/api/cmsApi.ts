export const makerApi = {
  GET_SEGMENTS: "/todos/1",
};

export const contentsApi = {
  GET_CONTENTS: (queryString?: string) => {
    return "/v2/cms/contents" + (queryString ? queryString : "");
  },
  CREATE_CONTENT: "/v2/cms/content/create",
  UPDATE_CONTENT: (id = "contentId") => "/v2/cms/content/update/" + id,
} as const;

export const componentsApi = {
  GET_COMPONENTS: (queryString?: string) => {
    return "/v2/cms/components" + (queryString ? queryString : "");
  },
  CREATE_COMPONENT: "/v2/cms/component/create",
  UPDATE_COMPONENT: (id = "componentId") => "/v2/cms/component/update/" + id,
} as const;

export const segmentsApi = {
  GET_SEGMENTS: (queryString?: string) => {
    return "/v2/cms/segments" + (queryString ? queryString : "");
  },
  CREATE_SEGMENT: "/v2/cms/segment/create",
  UPDATE_SEGMENT: (id = "segmentId") => "/v2/cms/segment/update/" + id,
} as const;
