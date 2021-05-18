/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2020-02-28 16:56:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-18 08:42:53
 */


import React from 'react';

import {ContextProvider} from "./Providers";
import {ThemeProvider} from "../components/ui-components/ui-elements/common/BaseElements";
import Routes from "./Routers";

const App=()=> {
  return (
    <ContextProvider>
    <ThemeProvider>
      <Routes/>
    </ThemeProvider>
    </ContextProvider>
  );
}

export default App;
