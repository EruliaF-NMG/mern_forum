/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2020-02-28 16:56:15 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-04-01 18:24:48
 */


import React from 'react';

import {FormContextProvider} from "../components/modules/core/context-providers/FormContext.provider";
import {AuthContextProvider} from "../components/modules/core/context-providers/AuthContext.provider";
import {UIContextProvider} from "../components/ui-components/context-providers/UIContext.provider";
import {CoreContextProvider} from "../components/modules/core/context-providers/CoreContext.provider";


const ProviderComposer=({ contexts, children })=>{
    return contexts.reduceRight(
      (kids, parent) =>
        React.cloneElement(parent, {
          children: kids,
        }),
      children
    );
}

const ContextProvider=({ children })=>{
    return (
      <ProviderComposer
        contexts={[ 
          <UIContextProvider/>,
          <AuthContextProvider/>,
          <FormContextProvider/>,  
          <CoreContextProvider/>     
        ]}
      >
        {children}
      </ProviderComposer>
    );
  }
  
export { 
    ContextProvider 
};