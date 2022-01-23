import { useCallback, useContext, useMemo } from "react";

import Context from "../store";

function useUploadMovieFile(){
    
    const {movieUploader} = useContext(Context);

    const uploadMovieFile = useCallback((file,movieId,onProgress, cancelToken,callback)=>{

            const formData = new FormData();
    
            formData.append('file', file)

    
            movieUploader(formData, movieId, onProgress, cancelToken).then(res=>{
                return callback(null,res);
            }).catch(e=>{
                return callback(e,{});
            })
    
    },[movieUploader]);
     
    return useMemo(()=>({
        uploadMovieFile
    }),[uploadMovieFile]);

};

export default useUploadMovieFile;


