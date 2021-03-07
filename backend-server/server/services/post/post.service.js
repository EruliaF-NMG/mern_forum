/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 08:33:52
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-07 21:08:05
 */

import CoreService from '../core-service';
import Post from '../../models/post/posts.model';

class PostService extends CoreService {
  constructor() {
    super(Post);
  }

  /**
   *
   * @description create new post
   * @param {Object} formObject
   * @param {Function} cb
   */
  createPost(formObject, cb) {
    this.create(formObject, cb);
  }

  /**
   *
   * @description update post
   * @param {String} id
   * @param {Object} formObject
   * @param {Function} cb
   */
  updatePost(id, formObject, cb) {
    this.update({ _id: id }, formObject, cb);
  }
}

export default new PostService();
