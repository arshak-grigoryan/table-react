import { useCallback, useState } from 'react';

function useTextSlice(str = '', leng = 50, isFullText = false) {
    const [isFull, setIsFull] = useState(isFullText)
    const allStr = str

    const slicedStr = str.slice(0, leng)

    const toggleStr = useCallback(() => setIsFull(!isFull),[
        isFull
    ]) // question there is no difference without useCallback 

    return {
        text: isFull ? allStr : slicedStr,
        isFull, 
        onClick: toggleStr
    }
}

export default useTextSlice