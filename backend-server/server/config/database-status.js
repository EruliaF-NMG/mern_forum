/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 10:17:47
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 22:42:35
 */

const userStatus = {
  UNBLOCKED: true,
  BLOCKED: false,
};

const postStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  BLOCKED: 'BLOCKED',
};

const commentStatus = {
  UNBLOCKED: true,
  BLOCKED: false,
};

const BasicRoleID = '604a310d8d757a4fccdf6e6a';

const roleCodes = {
  admin: 'ADMIN_USER',
  normalUser: 'NORMAL_USER',
};

// eslint-disable-next-line import/prefer-default-export
export { userStatus, postStatus, commentStatus, BasicRoleID, roleCodes };
