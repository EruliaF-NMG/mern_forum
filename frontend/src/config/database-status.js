/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 10:17:47
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 23:32:08
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

const roleCodes = {
  admin: 'ADMIN_USER',
  normalUser: 'NORMAL_USER',
};

export { userStatus, postStatus, commentStatus, roleCodes };
