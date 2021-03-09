/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-19 10:42:32
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 20:47:23
 */
import React from 'react';
import { PageLoader } from './common-includes/PageLoader';
import { HeaderBar } from './common-includes/HeaderBar';

const TemplateOne = ({ children = null }) => {
  return (
    <div className={`templateOneWrapper bg-light`}>
      <HeaderBar />
      <div className="bodyWrapper container">{children}</div>
      <PageLoader />
    </div>
  );
};

export { TemplateOne };
