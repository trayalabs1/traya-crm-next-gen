import { componentsApi, contentsApi, segmentsApi } from "@api/cmsApi";
import { toast } from "@hooks/use-toast";
import { axiosClient } from "@utils/axiosInterceptor";
import { getErrorMessage } from "@utils/common";
import { AxiosResponse } from "axios";
import {
  Component,
  Content,
  EntitiyType,
  MobileComponent,
  MobileContent,
  Segment,
} from "cms";
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
  segment?: Segment | null;
  component?: Component | null;
  content?: Content | null;
  loading: boolean;
  error: null | string;
  data: object | null;
  draftData?: object | null;
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
interface ComponentResponse {
  component_id: string;
  name: string;
  component_type: string;
  status: string;
  current_version: number;
  data: {
    title: string;
    description: string;
    contents: MobileContent[];
  };
  old_data?: {
    title: string;
    description: string;
    contents: MobileContent[];
  };
  new_data?: {
    title: string;
    description: string;
    contents: MobileContent[];
  };
  sub_components: MobileContent[];
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
  data: null,
  draftData: null,
};

export const useDiffCheckerStore = create<DiffCheckerActionAndState>()(
  devtools(
    (set, get) => ({
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
          const response: AxiosResponse<ComponentResponse[]> =
            await axiosClient.post(
              componentsApi.GET_COMPONENTS_BULK_BY_COMPONENT_IDS,
              { componentIds },
            );

          const components = response.data; // Original data from API

          // Transforming the components into the MobileComponent format
          const transformedComponents: MobileComponent[] = components.map(
            (component) => {
              const oldData = component.old_data;
              const newData = component.new_data;

              // Use optional chaining to prevent 'undefined' errors
              const selectedData =
                type === "currentVersion" ? oldData : newData;
              return {
                componentId: component.component_id,
                name: component.name,
                title: selectedData?.title || component.data.title || "",
                description:
                  selectedData?.description || component.data.description || "",
                contents: selectedData?.contents || [], // Contents from old or new data
                sub_components: component.sub_components || [], // Handle sub-components if present
              };
            },
          );
          const obj = { [type]: transformedComponents }; // Assign transformed data to either currentVersion or newVersion
          console.log("Transformed Components:", obj);
          set({ ...obj, loading: false });
        } catch (error: unknown) {
          const errorMessage = getErrorMessage(error);
          set({
            error: errorMessage,
            loading: false,
          });
          toast({
            description: errorMessage,
            variant: "destructive",
            duration: 1000,
          });
          return undefined;
        }
      },
      fetchDiffContentsBulk: async ({
        contentIds,
      }: FetchDiffContentsBulk): Promise<
        AxiosResponse<MobileContent[]> | undefined
      > => {
        try {
          const response: AxiosResponse<MobileContent[]> =
            await axiosClient.post(
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
    }),
    { name: "DiffChecker" },
  ),
);
