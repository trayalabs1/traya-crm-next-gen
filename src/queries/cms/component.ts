import {
  getComponentsBulk,
  getPublishedComponents,
} from "@services/cmsServices";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { Component, MobileComponent } from "cms";

interface ComponentBulk {
  componentIds: string[];
  draftdata: boolean;
}

export function useComponentBulk(
  { componentIds, draftdata = false }: ComponentBulk,
  options?: Omit<UseQueryOptions<MobileComponent[]>, "queryKey" | "queryFn">,
) {
  const query = useQuery({
    queryKey: ["getComponentsBulk", componentIds, draftdata],
    queryFn: () => getComponentsBulk({ componentIds, draftdata }),
    ...options,
  });

  return { ...query };
}

export function useGetPublishedComponents(
  queryString?: string,
  options?: Omit<UseQueryOptions<Component[]>, "queryKey" | "queryFn">,
) {
  const query = useQuery({
    queryKey: ["getPublishedContents", queryString],
    queryFn: () => getPublishedComponents(queryString),
    ...options,
  });

  return { ...query };
}
