import { componentsApi, contentsApi, segmentsApi } from "@api/cmsApi";
import { axiosClient } from "@utils/axiosInterceptor";
import { getErrorMessage } from "@utils/common";
import { AxiosResponse } from "axios";
import { EntitiyType, MobileComponent } from "cms";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
type ChangeType = "new" | "edit";
interface DiffCheckerActionAndState extends DiffCheckerState {
  toggleDiffCheckerDrawer: () => void;
  changeDiffType: (
    data: Pick<
      DiffCheckerState,
      "entityType" | "type" | "segment" | "component" | "content"
    >,
  ) => void;
  updateDiffStates: ({
    key,
    value,
  }: {
    key: keyof DiffCheckerState;
    value: DiffCheckerState[keyof DiffCheckerState];
  }) => void;
  fetchDiffSegment: (data: FetchDiffSegment) => Promise<void>;
  fetchDiffComponentsBulk: (data: FetchDiffComponentsBulk) => Promise<void>;
  fetchDiffContentsBulk: (data: FetchDiffContentsBulk) => Promise<void>;
}

interface DiffCheckerState {
  type: ChangeType | null;
  entityType: EntitiyType | null;
  isDiffCheckerOpen: boolean;
  currentVersion: MobileComponent[] | null;
  newVersion: MobileComponent[] | null;
  segment?: object | null;
  component?: object | null;
  content?: object | null;
  loading: boolean;
  error: null | string;
  diffCurrentData: MobileComponent[] | null;
  diffNewData: MobileComponent[] | null;
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
  type: "currentVersion" | "newVersion";
}

export const useDiffCheckerStore = create<DiffCheckerActionAndState>()(
  devtools((set, get) => ({
    isDiffCheckerOpen: false,
    entityType: null,
    type: null,
    currentVersion: null,
    newVersion: null,
    segment: null,
    component: null,
    content: null,
    loading: false,
    error: null,
    diffCurrentData: null,
    diffNewData: null,

    toggleDiffCheckerDrawer: () => {
      const { isDiffCheckerOpen } = get();
      set({ isDiffCheckerOpen: !isDiffCheckerOpen });
    },

    changeDiffType: ({ type, entityType, segment }) => {
      set({ entityType, type, segment });
    },

    updateDiffStates: ({
      key,
      value,
    }: {
      key: keyof DiffCheckerState;
      value: DiffCheckerState[keyof DiffCheckerState];
    }) => {
      set((state) => ({
        ...state,
        [key]: value,
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
      console.log(componentIds, "componentIds");
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
      type,
    }: FetchDiffContentsBulk) => {
      console.log(contentIds, "contentIds");
      set({ loading: true, error: null });
      try {
        const response: AxiosResponse<MobileComponent[]> =
          await axiosClient.post(contentsApi.GET_CONTENTS_BULK_BY_CONTENT_IDS, {
            contentIds: contentIds,
          });

        const obj = { [type]: response.data };
        set({ ...obj, loading: false });
      } catch (error: unknown) {
        set({
          error: getErrorMessage(error),
          loading: false,
        });
      }
    },
  })),
);
