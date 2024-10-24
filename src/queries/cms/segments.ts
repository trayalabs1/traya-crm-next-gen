import { getContentsComponentsFromSegment } from "@services/cmsServices";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { SegmentComponentsContentsExpandedType } from "cms";

interface segmentComponentContent {
  segmentId: string;
  draftdata: boolean;
}
export function useSegmentComponentContent(
  { segmentId, draftdata }: segmentComponentContent,
  options?: Omit<
    UseQueryOptions<SegmentComponentsContentsExpandedType>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: ["getContentComponentFromSegment", segmentId, draftdata],
    queryFn: () => getContentsComponentsFromSegment(segmentId, draftdata),
    ...options,
  });
}
