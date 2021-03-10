import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import { TemplateOne } from '../../../ui-components/templates/TemplateOne';
import { ForumWrapper } from '../../../ui-components/ui-elements/forum/ForumWrapper';
import {
  InputBoxWithState,
  InputButton,
} from '../../../ui-components/ui-elements/form';
import { getAllPostAPI } from '../../../../config/apiUrl.config';

const CardBody = ({ row = {}, key = 0 }) => {
  return (
    <Fragment>
      <h6 className="border-bottom pb-2 mb-0">{row.heading}</h6>
      <p className="defaultPaddingTopBottom border-bottom">
        {`${row.content}`.length > 300
          ? `${row.content.substr(0, 300)}.....`
          : row.conten}
      </p>
    </Fragment>
  );
};

const CardActionBody = ({ row = {}, key = 0 }) => {
  const history = useHistory();
  return (
    <Fragment>
      <InputButton
        btnText="View More"
        onClickBtnFn={() => history.push(`view-post/${row._id}`)}
      />
      <InputButton
        btnText="Edit"
        onClickBtnFn={() => history.push(`edit-post/${row._id}`)}
      />
    </Fragment>
  );
};

const SearchBox = (props) => {
  return (
    <div className="col-md-12 defaultMarginBottom">
      <InputBoxWithState
        formGroupName={props.formKey}
        inputName={'serachkey'}
        lableText={'Serach Key'}
      />
    </div>
  );
};

const DashbordPage = () => {
  return (
    <TemplateOne>
      <Fragment>
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
