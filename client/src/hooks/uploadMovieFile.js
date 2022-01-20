import { useCallback, useContext, useMemo } from "react";

import Context from "../store";

function useUploadMovieFile(){
    
    const {movieUploader} = useContext(Context);

    const uploadMovieFile = useCallback((file,movieId,onProgress,callback)=>{
        const fileReader = new FileReader();

        // fileReader.onload = (e)=>{
            const formData = new FormData();
    
            // formData.append('file', e.target.result);
            formData.append('file', file)

    
            movieUploader(formData, movieId, onProgress).then(res=>{
                return callback(null,res);
            }).catch(e=>{
                return callback(e,{});
            })
    
        // }
    
        // fileReader.readAsArrayBuffer(file);
    },[movieUploader]);
     
    return useMemo(()=>({
        uploadMovieFile
    }),[uploadMovieFile]);

};

export default useUploadMovieFile;


