import {
  getContents,
  getContentsBulk,
  getPublishedContents,
} from "@services/cmsServices";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { Content, Contents, MobileContent } from "cms";

export function useGetContents(
  queryString?: string,
  options?: Omit<UseQueryOptions<Contents>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: ["getContents", queryString],
    queryFn: () => getContents(queryString),
    ...options,
  });
}
interface ContentBulk {
  contentIds: string[];
  draftdata: boolean;
}

export function useContentBulk(
  { contentIds, draftdata = false }: ContentBulk,
  options?: Omit<UseQueryOptions<MobileContent[]>, "queryKey" | "queryFn">,
) {
  const query = useQuery({
    queryKey: ["getContentsBulk", contentIds, draftdata],
    queryFn: () => getContentsBulk({ contentIds, draftdata }),
    ...options,
  });

  return { ...query };
}

export function useGetPublishedContents(
  options?: Omit<UseQueryOptions<Content[]>, "queryKey" | "queryFn">,
) {
  const query = useQuery({
    queryKey: ["getPublishedContents"],
    queryFn: () => getPublishedContents(),
    ...options,
  });

  return { ...query };
}
