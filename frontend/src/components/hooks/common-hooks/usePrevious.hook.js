/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2020-05-15 10:27:51 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-05-15 10:33:11
 */
import { useRef,useEffect } from 'react';

const usePrevious=(props)=>{

    const ref = useRef();
  
    useEffect(() => {  
      ref.current = props;  
    }, [props]);

    return ref.current;
}

export {
    usePrevious
}