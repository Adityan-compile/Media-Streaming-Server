import { useCallback, useContext, useMemo } from "react";

import Context from "../store";

function useUploadShowFile() {
  const { showUploader } = useContext(Context);

  const uploadShowFile = useCallback(
    (file, ShowId, onProgress, cancelToken, callback) => {
      const formData = new FormData();

      formData.append("file", file);

      showUploader(formData, ShowId, onProgress, cancelToken)
        .then((res) => {
          return callback(null, res);
        })
        .catch((e) => {
          return callback(e, {});
        });
    },
    [showUploader]
  );

  return useMemo(
    () => ({
      uploadShowFile,
    }),
    [uploadShowFile]
  );
}

export default useUploadShowFile;
