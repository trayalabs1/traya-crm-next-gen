import { Roles } from "user";
import { useMemo } from "react";
import { statusList } from "@utils/common";

const useFilteredStatusList = (role?: Roles) => {
  return useMemo(() => {
    switch (role) {
      case "maker":
        return statusList.filter((status) =>
          ["draft", "submitted"].includes(status.value),
        );
      case "checker":
        return statusList.filter((status) => status.value === "submitted");
      case "publisher":
        return statusList.filter((status) =>
          [
            "approved_by_checker",
            "approved_by_publisher",
            "published",
          ].includes(status.value),
        );
      default:
        return [];
    }
  }, [role]);
};

export default useFilteredStatusList;
