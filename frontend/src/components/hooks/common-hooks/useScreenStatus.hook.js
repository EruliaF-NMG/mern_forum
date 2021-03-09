/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2020-05-21 13:25:53 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-05-24 11:25:25
 */

 import {useMemo,useState,useEffect,useCallback} from "react";
 import {screenSizeTypes} from "../../../config/template.config";


 /**
  * @Author: Nisal Madusanka(EruliaF) 
  * 
  */
const useScreenWidth=()=>{
    
    const getSize=()=>{
        if(typeof window === 'object'){
            return window.innerWidth;
        }else{
            return undefined
        }        
    }

    const [screenSize, setScreenSize] = useState(getSize);

    const handleResize = useCallback(
        () => {          
            setScreenSize(getSize());         
        },       
        [setScreenSize],
    ); 


    useEffect(() => {

        window.addEventListener('resize', handleResize);

        return () =>{
             window.removeEventListener('resize', handleResize);
        }

    }, [handleResize]);

    return [screenSize];
    
}

const useScreenType=()=>{
    const [width] = useScreenWidth();

    const type = useMemo(() => {
       
        if(width > screenSizeTypes.mediumDevice.width){
            return screenSizeTypes.largeDevice.key;
        }else if(width < screenSizeTypes.smallDevice.width){
            return screenSizeTypes.smallDevice.key;
        }else{
            return screenSizeTypes.mediumDevice.key;
        }

    }, [width]);

    return [type];
}

export {
    useScreenWidth,
    useScreenType,
    screenSizeTypes
}