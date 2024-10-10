import { componentsApi, contentsApi, segmentsApi } from "@api/cmsApi";
import { toast } from "@hooks/use-toast";
import { axiosClient } from "@utils/axiosInterceptor";
import { getErrorMessage } from "@utils/common";
import { AxiosResponse } from "axios";
import { EntitiyType, MobileComponent, MobileContent } from "cms";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface DiffCheckerActionAndState extends DiffCheckerState {
  toggleDiffCheckerDrawer: () => void;
  updateDiffStates: (data: Partial<DiffCheckerState>) => void;
  fetchDiffSegment: (data: FetchDiffSegment) => Promise<void>;
  fetchDiffComponentsBulk: (data: FetchDiffComponentsBulk) => Promise<void>;
  fetchDiffContentsBulk: (
    data: FetchDiffContentsBulk,
  ) => Promise<AxiosResponse<MobileContent[]> | undefined>;
  resetDiffCheckerStates: () => void;
}

interface DiffCheckerState {
  entityType: EntitiyType | null;
  isDiffCheckerOpen: boolean;
  currentVersion: MobileComponent[] | null;
  newVersion: MobileComponent[] | null;
  segment?: object | null;
  component?: object | null;
  content?: object | null;
  loading: boolean;
  error: null | string;
}

interface FetchDiffSegment {
  segmentId: string;
  type: "currentVersion" | "newVersion";
}
interface FetchDiffComponentsBulk {
  componentIds: string[];
  type: "currentVersion" | "newVersion";
}

interface FetchDiffContentsBulk {
  contentIds: string[];
}

const initialStates: DiffCheckerState = {
  isDiffCheckerOpen: false,
  entityType: null,
  currentVersion: null,
  newVersion: null,
  segment: null,
  component: null,
  content: null,
  loading: false,
  error: null,
};
export const useDiffCheckerStore = create<DiffCheckerActionAndState>()(
  devtools((set, get) => ({
    ...initialStates,
    toggleDiffCheckerDrawer: () => {
      const { isDiffCheckerOpen } = get();
      set({ isDiffCheckerOpen: !isDiffCheckerOpen });
    },

    resetDiffCheckerStates: () => {
      set(initialStates);
    },
    updateDiffStates: (newState: Partial<DiffCheckerState>) => {
      set((state) => ({
        ...state,
        ...newState,
      }));
    },

    fetchDiffSegment: async ({ segmentId, type }: FetchDiffSegment) => {
      set({ loading: true, error: null });
      try {
        const response: AxiosResponse<MobileComponent[]> =
          await axiosClient.get(
            segmentsApi.GET_CONTENTS_COMPONENTS_FROM_SEGMENT(segmentId, true),
          );

        const obj = { [type]: response.data };
        set({ ...obj, loading: false });
      } catch (error: unknown) {
        set({
          error: getErrorMessage(error),
          loading: false,
        });
      }
    },

    fetchDiffComponentsBulk: async ({
      componentIds,
      type,
    }: FetchDiffComponentsBulk) => {
      set({ loading: true, error: null });
      try {
        const response: AxiosResponse<MobileComponent[]> =
          await axiosClient.post(
            componentsApi.GET_COMPONENTS_BULK_BY_COMPONENT_IDS,
            { componentIds: componentIds },
          );

        const obj = { [type]: response.data };
        set({ ...obj, loading: false });
      } catch (error: unknown) {
        set({
          error: getErrorMessage(error),
          loading: false,
        });
      }
    },
    fetchDiffContentsBulk: async ({
      contentIds,
    }: FetchDiffContentsBulk): Promise<
      AxiosResponse<MobileContent[]> | undefined
    > => {
      try {
        const response: AxiosResponse<MobileContent[]> = await axiosClient.post(
          contentsApi.GET_CONTENTS_BULK_BY_CONTENT_IDS,
          { contentIds },
        );

        return response;
      } catch (error) {
        toast({
          description: getErrorMessage(error),
          variant: "destructive",
          duration: 1000,
        });
        return undefined;
      }
    },
  })),
);
