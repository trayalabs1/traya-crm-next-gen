import { getContentsComponentsFromSegment } from "@services/cmsServices";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { SegmentComponentsContentsExpandedType } from "cms";

interface segmentComponentContent {
  segmentId: string;
  fetchContents: boolean;
}
export function useSegmentComponentContent(
  { segmentId, fetchContents }: segmentComponentContent,
  options?: Omit<
    UseQueryOptions<SegmentComponentsContentsExpandedType>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: ["getContentComponentFromSegment", segmentId, fetchContents],
    queryFn: () => getContentsComponentsFromSegment(segmentId, fetchContents),
    ...options,
  });
}
