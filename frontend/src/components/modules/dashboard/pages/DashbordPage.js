import React, { Fragment } from 'react';
import { TemplateOne } from '../../../ui-components/templates/TemplateOne';
import { ForumWrapper } from '../../../ui-components/ui-elements/forum/ForumWrapper';
import { getAllPostAPI } from '../../../../config/apiUrl.config';

const CardBody = ({ row = {}, key = 0 }) => {
  return (
    <Fragment>
      <h6 className="border-bottom pb-2 mb-0">{row.heading}</h6>
      <p className="defaultPaddingTopBottom border-bottom">{row.content}</p>
    </Fragment>
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
          cardBody={CardBody}
        />
      </Fragment>
    </TemplateOne>
  );
};

export default DashbordPage;
