import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";

export function EntityError() {
  return (
    <Alert variant="destructive" className="my-10">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Diff Entity is required, To show the diff checker
      </AlertDescription>
    </Alert>
  );
}
