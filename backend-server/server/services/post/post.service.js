/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 08:33:52
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-08 11:21:36
 */

import CoreService from '../core-service';
import Post from '../../models/post/posts.model';
import { postStatus } from '../../config/database-status';

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

  pagination(filterObject, cb) {
    const page = filterObject.page || 1;
    const limit = filterObject.limit || 10;

    const skip = page <= 1 ? 0 : limit * (page - 1);
    const query = {
      deleted_at: null,
    };

    if (Object.prototype.hasOwnProperty.call(postStatus, filterObject.status)) {
      query.status = filterObject.status;
    }

    if (filterObject.serachkey) {
      query.$or = [
        { heading: { $regex: `.*${filterObject.serachkey}.*` } },
        { tags: { $regex: `.*${filterObject.serachkey}.*` } },
      ];
    }
    this.model.find(query).skip(skip).limit(limit).exec(cb);
  }
}

export default new PostService();
