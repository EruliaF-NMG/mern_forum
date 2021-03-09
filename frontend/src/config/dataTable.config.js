/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-04-02 19:23:25
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 10:17:02
 */

const actionBtnTypes = {
  create: 'CREATE',
  edit: 'EDIT',
  view: 'VIEW',
  delete: 'DELETE',
  other: 'OTHER',
};

const emptyFun = (...para) => undefined;

const commonActionBtnPops = {
  [actionBtnTypes.create]: {
    elementStyle: 'createBtn',
    icon: 'fas fa-plus-circle',
    btnText: 'Create',
    tooltip: '',
    isBtnDisabled: false,
    onClickBtnFn: () => emptyFun(),
  },
  [actionBtnTypes.edit]: {
    elementStyle: 'editBtn',
    icon: 'fas fa-edit',
    btnText: 'Edit',
    tooltip: '',
    isBtnDisabled: false,
    onClickBtnFn: () => emptyFun(),
  },
  [actionBtnTypes.view]: {
    elementStyle: 'viewBtn',
    icon: 'fas fa-binoculars',
    btnText: 'View',
    tooltip: '',
    isBtnDisabled: false,
    onClickBtnFn: () => emptyFun(),
  },
  [actionBtnTypes.delete]: {
    elementStyle: 'deleteBtn',
    icon: 'fas fa-trash-alt',
    btnText: 'Delete',
    tooltip: '',
    isBtnDisabled: false,
    onClickBtnFn: () => emptyFun(),
  },
  [actionBtnTypes.other]: {
    elementStyle: 'otherBtn',
    isBtnDisabled: false,
    onClickBtnFn: () => emptyFun(),
  },
};

export { actionBtnTypes, commonActionBtnPops };
