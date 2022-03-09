import {useRef} from 'react'

function useToast() {
    const toastRef = useRef(null);
    return toastRef;
}

export default useToast;