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
  })),
);
