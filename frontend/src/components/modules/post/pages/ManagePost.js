/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-13 14:16:39
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 15:27:18
 */
import React, { useState } from 'react';
import { TemplateOne } from '../../../ui-components/templates/TemplateOne';
import { CheckBox } from '../../../ui-components/ui-elements/form';
import { getAllPostAPI } from '../../../../config/apiUrl.config';

import { ForumWrapper } from '../../../ui-components/ui-elements/forum/ForumWrapper';
import { postStatus } from '../../../../config/database-status';
import {
  SearchBox,
  CardActionBody,
  CardBody,
} from '../../post/pages/includes/PostUIElements';

const ManagePost = ({ userID = null }) => {
  const [uiState, setUIState] = useState(postStatus.APPROVED);
  return (
    <TemplateOne>
      <div className="fullWidthDiv">
        <div className="fullWidthDiv defaultPaddingTop">
          <CheckBox
            elementWrapperStyle={'col-md-2'}
            inputName="status"
            inputValue={uiState === postStatus.APPROVED ? true : false}
            labelText={'Approved'}
            onChangeFn={() => setUIState(postStatus.APPROVED)}
          />
          <CheckBox
            elementWrapperStyle={'col-md-2'}
            inputName="status"
            inputValue={uiState === postStatus.PENDING ? true : false}
            labelText={'Pending'}
            onChangeFn={() => setUIState(postStatus.PENDING)}
          />
          <CheckBox
            elementWrapperStyle={'col-md-2'}
            inputName="status"
            inputValue={uiState === postStatus.BLOCKED ? true : false}
            labelText={'Blocked'}
            onChangeFn={() => setUIState(postStatus.BLOCKED)}
          />
        </div>
        <ForumWrapper
          heading={'Manage Posts'}
          apiUrl={`${getAllPostAPI.url}?&status=${uiState}`}
          forumKey={`${getAllPostAPI.key}_ManagePosts`}
          defaultSearchFormObject={{ serachkey: '' }}
          cardBody={CardBody}
          searchComponent={SearchBox}
          cardAction={CardActionBody}
        />
      </div>
    </TemplateOne>
  );
};

export default ManagePost;
