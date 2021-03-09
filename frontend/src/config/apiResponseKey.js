/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-22 12:44:12
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 18:12:33
 */

const responseCode = {
  DATA_RECEIVED: 'DATA_RECEIVED',
  SUCCESSFULLY_CREATED: 'SUCCESSFULLY_CREATED',
  FAILED_CREATED: 'FAILED_CREATED',
  SUCCESSFULLY_UPDATED: 'SUCCESSFULLY_UPDATED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  EXCEPTION_OCCURRED: 'EXCEPTION_OCCURRED',
};

const apiResponseStoringType = {
  dataTable: 'DATA_TABLE',
  dateTableLinkedForm: 'DATA_TABLE_LINKED_FORM',
  responseLinkToFrom: 'API_RESPONSE_LINKED_FORM',
  setResponse: 'SET_API_RESPONSE',
  apiResponseToFormState: 'SET_FORM_STATE',
};

export { apiResponseStoringType, responseCode };
