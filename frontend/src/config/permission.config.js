export const permissions = {
  NONE: {
    key: 'NONE',
    description: '',
    permissions: 'NONE',
  },
  CREATE_POST: {
    key: 'CREATE_POST',
    description: '',
    permissions: ['CREATE_POST'],
  },
  EDIT_POST: {
    key: 'EDIT_POST',
    description: '',
    permissions: ['EDIT_OWN_POST', 'EDIT_OWN_AND_OTHER_POST'],
  },
  REMOVE_OWN_POST: {
    key: 'REMOVE_OWN_POST',
    description: '',
    permissions: ['REMOVE_OWN_POST'],
  },
  MANAGE_POST_STATUS: {
    key: 'MANAGE_POST_STATUS',
    description: '',
    permissions: ['MANAGE_POST_STATUS'],
  },
  EDIT_OWN_PROFILE: {
    key: 'EDIT_OWN_PROFILE',
    description: '',
    permissions: ['EDIT_OWN_PROFILE'],
  },
  MANAGE_USER_STATUS: {
    key: 'MANAGE_USER_STATUS',
    description: '',
    permissions: ['MANAGE_USER_STATUS'],
  },
  MANAGE_USER_ROLE_AND_PERMISSIONS: {
    key: 'MANAGE_USER_ROLE_AND_PERMISSIONS',
    description: '',
    permissions: ['MANAGE_USER_ROLE_AND_PERMISSIONS'],
  },
};
