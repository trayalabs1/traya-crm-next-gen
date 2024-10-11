import {
  getComponentsBulk,
  getPublishedComponents,
} from "@services/cmsServices";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { Component, MobileComponent } from "cms";

interface ComponentBulk {
  componentIds: string[];
}

export function useComponentBulk(
  { componentIds }: ComponentBulk,
  options?: Omit<UseQueryOptions<MobileComponent[]>, "queryKey" | "queryFn">,
) {
  const query = useQuery({
    queryKey: ["getComponentsBulk", componentIds],
    queryFn: () => getComponentsBulk({ componentIds }),
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
