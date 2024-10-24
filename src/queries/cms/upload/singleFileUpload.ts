import { mediaApi } from "@api/cmsApi";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse, AxiosProgressEvent } from "axios";
import { useState, useEffect } from "react";

interface SingleFileArgs {
  formDataKey: string;
  file: File;
}

export const useSingleFileUploadMutation = ({
  formDataKey,
  file,
}: SingleFileArgs) => {
  const [progress, setProgress] = useState<number>(0);

  const form = new FormData();
  form.append(formDataKey, file);

  const mutation = useMutation<AxiosResponse<void>, AxiosError, void>({
    mutationFn: async () => {
      const response = await axios.post(mediaApi.UPLOAD, form, {
        onUploadProgress: (ev: AxiosProgressEvent) => {
          if (ev.total) {
            setProgress(Math.round((ev.loaded * 100) / ev.total));
          }
        },
      });
      return response;
    },
  });

  useEffect(() => {
    if (mutation.isIdle) {
      setProgress(0);
    }
  }, [mutation.isIdle]);

  return { ...mutation, progress };
};
