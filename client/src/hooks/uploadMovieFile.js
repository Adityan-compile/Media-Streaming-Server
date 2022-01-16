import { useCallback, useContext, useMemo } from "react";

import Context from "../store";

function useUploadMovieFile(){
    
    const {movieUploader} = useContext(Context);

    const uploadMovieFile = useCallback((file,movieId,callback)=>{
        const fileReader = new FileReader();

        fileReader.onload = (e)=>{
            const formData = new FormData();
    
            formData.append('file', e.target.result);
    
            movieUploader(formData, movieId).then(res=>{
                return callback(null,res);
            }).catch(e=>{
                return callback(e,{});
            })
    
        }
    
        fileReader.readAsArrayBuffer(file);
    },[movieUploader]);
     
    return useMemo(()=>({
        uploadMovieFile
    }),[uploadMovieFile]);

};

export default useUploadMovieFile;


