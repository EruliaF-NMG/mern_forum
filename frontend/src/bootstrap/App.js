/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2020-02-28 16:56:11 
 * @Last Modified by: Chanaka Wickramasinghe
 * @Last Modified time: 2020-03-11 16:47:58
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
