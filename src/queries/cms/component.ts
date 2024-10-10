import { getComponentsBulk } from "@services/cmsServices";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { MobileComponent } from "cms";

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
