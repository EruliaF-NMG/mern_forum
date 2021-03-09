import React, { useContext, Fragment } from 'react';

import { CircleLoaderElement } from '../../ui-elements/common/BaseElements';
import { UIContext } from '../../context-providers/UIContext.provider';

const PageLoader = () => {
  const [state] = useContext(UIContext);
  return (
    <Fragment>
      {state.setPageLoader === true ? (
        <div className="pageLoader">
          <CircleLoaderElement
            loaderStyle={'loader'}
            loaderSize={50}
            loaderThickness={3}
          />
        </div>
      ) : null}
    </Fragment>
  );
};

export { PageLoader };
