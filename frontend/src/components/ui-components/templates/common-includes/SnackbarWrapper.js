import React, { Fragment, useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { UIContext } from '../../context-providers/UIContext.provider';

//const emptyFun = (...para) => undefined;

const SnackbarWrapper = ({
  openStatus = false,
  duration = 5000,
  message = null,
  index = '1',
  messageType = 'success',
}) => {
  return (
    <Snackbar
      style={{
        marginTop: index * 70,
      }}
      open={openStatus}
      autoHideDuration={duration}
      key={index}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={Slide}
    >
      <Alert severity={messageType}>{message}</Alert>
    </Snackbar>
  );
};

const SnackBarList = () => {
  const [uiState] = useContext(UIContext);

  return (
    <Fragment>
      {(uiState.flashMessageList || []).map((value, index) => {
        return (
          <SnackbarWrapper
            key={index}
            index={index}
            openStatus={value.status || false}
            duration={500000}
            message={value.message || ''}
            messageType={value.messageType || ''}
          />
        );
      })}
    </Fragment>
  );
};

export { SnackbarWrapper, SnackBarList };
