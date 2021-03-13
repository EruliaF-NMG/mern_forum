import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import { TemplateOne } from '../../../ui-components/templates/TemplateOne';
import { ForumWrapper } from '../../../ui-components/ui-elements/forum/ForumWrapper';
import { InputButton } from '../../../ui-components/ui-elements/form';
import { CheckPermission } from '../../../ui-components/ui-elements/common/BaseElements';
import { getAllPostAPI } from '../../../../config/apiUrl.config';
import { permissions } from '../../../../config/permission.config';
import {
  SearchBox,
  CardActionBody,
  CardBody,
} from '../../post/pages/includes/PostUIElements';

const DashbordPage = () => {
  const history = useHistory();
  return (
    <TemplateOne>
      <Fragment>
        <CheckPermission permission={permissions.CREATE_POST.permissions}>
          <div className="fullWidthDiv">
            <InputButton
              elementWrapperStyle={'floatRight'}
              btnText="Create New Post"
              onClickBtnFn={() => history.push(`create-post`)}
            />
          </div>
        </CheckPermission>
        <ForumWrapper
          heading={'Recent Posts'}
          apiUrl={getAllPostAPI.url}
          forumKey={getAllPostAPI.key}
          defaultSearchFormObject={{ serachkey: '' }}
          cardBody={CardBody}
          searchComponent={SearchBox}
          cardAction={CardActionBody}
        />
      </Fragment>
    </TemplateOne>
  );
};

export default DashbordPage;
