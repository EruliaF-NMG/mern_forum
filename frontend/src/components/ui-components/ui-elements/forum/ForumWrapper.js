import React, { Fragment, useState } from 'react';
import { UICard, VariableToComponent } from '../common/BaseElements';
import { InputButton } from '../form/Button';
import { useForumState } from '../../../hooks/common-hooks/useForum.hook';

const ForumWrapper = ({
  heading = 'Recent Posts',
  apiUrl = null,
  forumKey = '',
  cardBody = () => <Fragment></Fragment>,
}) => {
  const [
    responseUpdateStatus,
    reloadStatus,
    responseFetchingStatus,
    pagingObject,
    tableBody,
    requestAPIDataFn,
    forumState,
    setforumStateFn,
  ] = useForumState(apiUrl, forumKey);
  return (
    <div className="forumWrapperStyle">
      <div className="d-flex align-items-center p-3 my-3 text-white rounded shadow-sm forumHeadingWrapper">
        <div className="lh-1 headingTextWrapper">
          <h1 className="h6 mb-0 text-white lh-1">{heading}</h1>
        </div>
        <div className="filterIconWrapper">
          <h1 className="h6 mb-0 text-white lh-1">
            <span
              onClick={() =>
                setforumStateFn({
                  ...forumState,
                  isShowSearch: !forumState.isShowSearch,
                })
              }
            >
              <i className="mdi mdi-filter-variant" />
            </span>
          </h1>
        </div>
      </div>

      {forumState.isShowSearch === true ? <div>Filter</div> : null}

      {tableBody.map((item, index) => {
        return (
          <UICard elementStyle={'detailWrapper'}>
            <VariableToComponent
              component={cardBody}
              props={{
                row: item,
                key: index,
              }}
            />
            <div className="actionWrapper defaultPaddingTop">
              <InputButton btnText="View More" />
              <InputButton btnText="Edit" />
            </div>
          </UICard>
        );
      })}
      <UICard elementStyle={'detailWrapper'}>
        <h6 className="border-bottom pb-2 mb-0">Recent updates</h6>
        <p className="defaultPaddingTopBottom border-bottom">
          asdasdasd sadasdasd sdasdasd sadasdasd sDASDFASDF SADASDASD...
        </p>
        <div className="actionWrapper defaultPaddingTop">
          <InputButton btnText="View More" />
          <InputButton btnText="Edit" />
        </div>
      </UICard>

      <UICard elementStyle={'pagingWrapper'}>
        <InputButton btnText="First Page" startIcon="mdi mdi-page-first" />
        <InputButton btnText="Previous" startIcon="mdi mdi-chevron-left" />
        <select className="defaultMarginRight">
          <option>10</option>
          <option>15</option>
          <option>20</option>
          <option>25</option>
        </select>
        <InputButton btnText="Next" endIcon="mdi mdi-chevron-right" />
        <InputButton btnText="Last Page" endIcon="mdi mdi-page-last" />
      </UICard>
    </div>
  );
};

export { ForumWrapper };
