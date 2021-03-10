import React, { Fragment, useState } from 'react';
import {
  emptyFun,
  UICard,
  VariableToComponent,
  CircleLoaderElement,
} from '../common/BaseElements';
import { InputButton, FormWrapper, InputButtonWithState } from '../form';
import { useForumState } from '../../../hooks/common-hooks/useForum.hook';
import { getDataByFormObject } from '../../../../helpers/common-helpers/common.helpers';

const PagingWrapper = ({ pagingObject = {}, requestAPIDataFn = emptyFun }) => {
  return (
    <UICard elementStyle={'pagingWrapper'}>
      <InputButton
        btnText="First Page"
        startIcon="mdi mdi-page-first"
        isBtnDisabled={pagingObject.current_page === 1 ? true : false}
        onClickBtnFn={() => requestAPIDataFn('next', 1)}
      />
      <InputButton
        btnText="Previous"
        startIcon="mdi mdi-chevron-left"
        isBtnDisabled={pagingObject.current_page - 1 === 0 ? true : false}
        onClickBtnFn={() =>
          requestAPIDataFn('next', pagingObject.current_page - 1)
        }
      />
      <select
        className="defaultMarginRight"
        value={pagingObject.page_size}
        onChange={(event) => requestAPIDataFn('pageSize', event.target.value)}
      >
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
      </select>

      <InputButton
        btnText="Next"
        endIcon="mdi mdi-chevron-right"
        isBtnDisabled={
          pagingObject.current_page + 1 > pagingObject.page_count ? true : false
        }
        onClickBtnFn={() =>
          requestAPIDataFn('next', pagingObject.current_page + 1)
        }
      />
      <InputButton
        btnText="Last Page"
        endIcon="mdi mdi-page-last"
        isBtnDisabled={
          pagingObject.page_count === null
            ? true
            : pagingObject.page_count === pagingObject.current_page
            ? true
            : false
        }
        onClickBtnFn={() => requestAPIDataFn('next', pagingObject.page_count)}
      />
    </UICard>
  );
};

const SearchFromWrapper = ({
  forumKey = '',
  defaultSearchFormObject = {},
  searchComponent = () => <Fragment></Fragment>,
  setforumStateFn = emptyFun,
  forumState = {},
  requestAPIDataFn = emptyFun,
}) => {
  return (
    <UICard elementStyle="formWrapperCard defaultMarginBottom">
      <FormWrapper
        elementStyle="formWrapper"
        setGroupName={`${forumKey}_search`}
        formGroupLinkWith={forumKey}
        setFormObject={defaultSearchFormObject}
      >
        <div className="row fullWidthDiv">
          <VariableToComponent
            component={searchComponent}
            props={{
              formKey: `${forumKey}_search`,
            }}
          />
        </div>

        <div className="fullWidthDiv buttonWrapper">
          <InputButtonWithState
            btnText="Search"
            startIcon="fas fa-search"
            elementWrapperStyle={'defaultMarginRight'}
            formGroupName={`${forumKey}_search`}
            onClickBtnFn={(event) => {
              setforumStateFn({
                ...forumState,
                formObject: getDataByFormObject(event.formObject || {}),
              });
              requestAPIDataFn('searchFrom', event.formObject || {});
            }}
          />
          <InputButtonWithState
            btnText="Reset"
            startIcon="fas fa-sync-alt"
            elementWrapperStyle={'refreshBtn'}
            formGroupName={`${forumKey}_search`}
            mergeToForm={defaultSearchFormObject}
            onClickBtnFn={(event) => {
              setforumStateFn({
                ...forumState,
                formObject: defaultSearchFormObject,
              });
              requestAPIDataFn('searchFrom', defaultSearchFormObject);
            }}
          />
        </div>
      </FormWrapper>
    </UICard>
  );
};

const CardBodyWrapper = ({
  tableBody = [],
  cardBody = () => <Fragment></Fragment>,
  cardAction = () => <Fragment></Fragment>,
}) => {
  return (
    <Fragment>
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
              <VariableToComponent
                component={cardAction}
                props={{
                  row: item,
                  key: index,
                }}
              />
            </div>
          </UICard>
        );
      })}
    </Fragment>
  );
};

const ForumWrapper = ({
  heading = 'Recent Posts',
  apiUrl = null,
  forumKey = '',
  isSetSearchFrom = true,
  defaultSearchFormObject = {},
  searchComponent = () => <Fragment></Fragment>,
  cardBody = () => <Fragment></Fragment>,
  cardAction = () => <Fragment></Fragment>,
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

      <Fragment>
        {forumState.isShowSearch === true && isSetSearchFrom === true ? (
          <SearchFromWrapper
            forumKey={forumKey}
            defaultSearchFormObject={defaultSearchFormObject}
            searchComponent={searchComponent}
            setforumStateFn={setforumStateFn}
            forumState={forumState}
            requestAPIDataFn={requestAPIDataFn}
          />
        ) : null}
      </Fragment>

      <Fragment>
        {apiUrl &&
        (responseFetchingStatus === 'init' ||
          responseFetchingStatus === undefined) ? (
          <div className="fullWidthDiv defaultMarginTopBottom">
            <center>
              <CircleLoaderElement />
            </center>
          </div>
        ) : (
          <Fragment>
            {responseFetchingStatus === 'error' || tableBody.length === 0 ? (
              <div className="fullWidthDiv defaultMarginTopBottom">
                No result found
              </div>
            ) : (
              <Fragment>
                <CardBodyWrapper
                  tableBody={tableBody}
                  cardBody={cardBody}
                  cardAction={cardAction}
                />
                <PagingWrapper
                  pagingObject={pagingObject}
                  requestAPIDataFn={requestAPIDataFn}
                />
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

export { ForumWrapper };
