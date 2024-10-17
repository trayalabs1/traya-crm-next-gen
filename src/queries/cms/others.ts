import { getVersionHistory } from "@services/cmsServices";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { VersionHistory, VersionHistoryParams } from "cms";

export function useVersionHistory(
  params: VersionHistoryParams,
  options?: Omit<UseQueryOptions<VersionHistory[]>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: ["getVersionHistory", params],
    queryFn: () => getVersionHistory(params),
    ...options,
  });
}
