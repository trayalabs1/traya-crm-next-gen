import { getContents } from "@services/cmsServices";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { Contents } from "cms";

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
