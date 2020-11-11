import { useRef, useEffect } from 'react';

function useUpdate(effect, deps) {
    const mounted = useRef(false)
    useEffect(
        mounted ? effect : () => mounted.current = true, 
        deps
    )
}

export default useUpdate