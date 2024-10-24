import { getProfile } from "@services/userServices";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Profile } from "user";

export function useProfile(
  options?: Omit<UseQueryOptions<Profile>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfile(),
    ...options,
  });
}
