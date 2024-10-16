import { Roles } from "user";
import { useMemo } from "react";

const useFilteredStatusList = (role?: Roles) => {
  return useMemo(() => {
    switch (role) {
      case "maker":
        return [
          { label: "DRAFT", value: "draft" },
          { label: "SUBMITTED", value: "submitted" },
          { label: "PUBLISHED", value: "published" },
        ];
      case "checker":
        return [
          { label: "PENDING", value: "submitted" },
          { label: "APPROVED", value: "approved_by_checker" },
        ];

      case "publisher":
        return [
          { label: "PENDING", value: "approved_by_checker" },
          { label: "PUBLISHED", value: "published" },
        ];
      default:
        return [];
    }
  }, [role]);
};

export default useFilteredStatusList;
