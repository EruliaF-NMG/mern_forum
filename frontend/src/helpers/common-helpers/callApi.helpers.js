/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-21 16:17:02
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 21:18:40
 */

import axios from 'axios';

import { checkUserINLocalStorage, logoutUser } from './manageStorage.helpers';
import { _get } from './lodash.wrappers';

/**
 * @description: request data from api
 * @param {String} apiParth api parth
 * @param {String} methodType method type
 * @param {Object} headerObject header request
 * @param {Object|Array} requestBody request body
 * @param {Function} call-back function
 */
const axiosWrapper = (
  apiParth,
  methodType = 'get',
  headerObject,
  requestBody = {},
  onUpload,
  cb
) => {
  let apiCallObject = {
    ...headerObject,
    method: methodType,
    url: apiParth,
    data: requestBody,
  };

  if (onUpload !== false) {
    apiCallObject['onUploadProgress'] = (progressEvent) =>
      onUpload(progressEvent);
  }
  axios(apiCallObject)
    .then((response) => {
      cb(null, {
        _statue: true,
        data: response.data,
      });
    })
    .catch((error) => {
      if (_get(error, 'response.data', 'NONE') === 'Unauthorized') {
        logoutUser();
        window.location.reload();
      }
      cb(
        {
          _statue: false,
          data: _get(error, 'response.data', {}),
        },
        null
      );
    });
};

const createHeader = (isSetHeaders = true, multipart = false) => {
  let headers = {
    accept: 'application/json',
    'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
  };
  if (isSetHeaders === true) {
    let userData = checkUserINLocalStorage();

    if (_get(userData, 'result.access_token', '') === '') {
      window.location.reload();
    }

    headers['Authorization'] =
      'Bearer ' + _get(userData, 'result.access_token', '');
  }
  return {
    headers: headers,
  };
};

/**
 * @Author: Nisal Madusanka(EruliaF)
 * @description: request data from api
 * @param {String} apiUrl api url
 */
const callApi = (apiUrl = null) => {
  var attributes = {
    apiUrl: apiUrl,
    isSetHeaders: true,
    multipart: false,
    method: 'get',
    body: {},
    onUpload: false,
  };
  return {
    /**
     * @description: set headers
     * @param {Boolean} status set headers
     */

    headers: function (status = false) {
      attributes = {
        ...attributes,
        isSetHeaders: status,
      };
      return this;
    },
    /**
     * @description: set multipart
     * @param {*} status
     */
    isMultipart: function (status = true) {
      attributes = {
        ...attributes,
        multipart: status,
      };
      return this;
    },
    /**
     * @description: set api method type
     * @param {String} method set api method type
     */

    method: function (method = 'post') {
      attributes = {
        ...attributes,
        method: method,
      };
      return this;
    },
    /**
     * @description: set api body
     * @param {Object|Array} status set api body
     */

    body: function (body = {}) {
      attributes = {
        ...attributes,
        body: body,
      };
      return this;
    },
    /**
     * @description: tracking uploading process
     * @param {Funtion} onUploadFn
     */
    onUpload: function (onUploadFn) {
      attributes = {
        ...attributes,
        onUpload: onUploadFn,
      };
      return this;
    },

    /**
     * @description: full  object
     * @param {Funtion} onUploadFn
     */
    setFullObject: function (object) {
      attributes = {
        ...attributes,
        ...object,
      };
      return this;
    },

    /**
     * @description: send request to end-point
     * @param {Function} cb callback function
     */
    send: function (cb) {
      const headerRequest = createHeader(
        attributes.isSetHeaders,
        attributes.multipart
      );

      return axiosWrapper(
        attributes.apiUrl,
        attributes.method,
        headerRequest,
        attributes.body,
        attributes.onUpload,
        cb
      );
    },
  };
};

export { callApi };
