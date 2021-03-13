/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 08:33:52
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-13 10:16:08
 */
import mongoose from 'mongoose';
import CoreService from '../core-service';
import Post from '../../models/post/posts.model';
import { postStatus } from '../../config/database-status';
import { isEmptyValue } from '../../helpers/common-helpers/common-methods';
import { asyncParallel } from '../../helpers/common-helpers/async-method-wrapper';
import { getInt } from '../../helpers/common-helpers/lodash.wrappers';

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
    const page = getInt(filterObject, 'page', 1);
    const limit = getInt(filterObject, 'limit', 10);

    const skip = page <= 1 ? 0 : limit * (page - 1);
    const query = {
      deleted_at: null,
    };

    if (Object.prototype.hasOwnProperty.call(postStatus, filterObject.status)) {
      query.status = filterObject.status;
    }

    if (
      isEmptyValue(filterObject.created_by) === false &&
      mongoose.Types.ObjectId.isValid(filterObject.created_by)
    ) {
      query.created_by = mongoose.Types.ObjectId(filterObject.created_by);
    }

    if (filterObject.serachkey) {
      query.$or = [
        { heading: { $regex: `.*${filterObject.serachkey}.*` } },
        { tags: { $regex: `.*${filterObject.serachkey}.*` } },
      ];
    }

    asyncParallel(
      {
        getCount: (getCountCB) => {
          this.model.count(query, getCountCB);
        },
        getResult: (getResultCB) => {
          this.model
            .find(query)
            .populate({
              path: 'created_by',
              model: 'User',
            })
            .populate([
              {
                path: 'comments.created_by',
                model: 'User',
              },
            ])
            .skip(skip)
            .limit(limit)
            .exec(getResultCB);
        },
      },
      (error, result) => {
        if (error) {
          cb(error);
        }
        cb(null, {
          current_page: page,
          total_pages: Math.ceil(result.getCount / limit),
          data: result.getResult,
          total_items: result.getCount,
          page_size: limit,
        });
      }
    );
  }

  findPostByID(id, cb) {
    this.model
      .findOne({
        _id: id,
        deleted_at: null,
      })
      .populate({
        path: 'created_by',
        model: 'User',
      })
      .populate([
        {
          path: 'comments.created_by',
          model: 'User',
        },
      ])
      .exec(cb);
  }
}

export default new PostService();
