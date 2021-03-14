/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 08:06:03
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-14 10:38:40
 */

import CoreService from '../core-service';
import OauthClient from '../../models/auth/oauthClient.model';

class OauthClientService extends CoreService {
  constructor() {
    super(OauthClient);
  }

  /**
   * @description create Client
   * @param {Object} createObject
   * @param {Function} cb
   */
  createClient(clientObject = {}, cb) {
    const client = {
      name: clientObject.name,
      client_code: clientObject.client_code,
      secret: clientObject.secret,
    };

    this.create(client, cb);
  }
}

export default new OauthClientService();
