/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 07:59:32
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-08 10:35:31
 */

export default class CoreService {
  constructor(model) {
    this.model = model;
  }

  /**
   * @description add data to db
   * @param {Object} createObject
   * @param {Function} cb
   */
  create(createObject = {}, cb) {
    this.model.create(createObject, cb);
  }

  /**
   * @description find One data from model
   * @param {Object} filterOption
   * @param {Function} cb
   */
  findOne(filterOption = {}, cb) {
    this.model.findOne(filterOption, cb);
  }

  /**
   * @description find by id
   * @param {Object} filterOption
   * @param {Function} cb
   */
  findByID(id, cb) {
    this.model.findById(id, cb);
  }

  /**
   * @description filter all data from model
   * @param {Object} filterOption
   * @param {Function} cb
   */
  find(filterOption = {}, cb) {
    this.model.find(filterOption, cb);
  }

  /**
   * @description filter all data from model
   * @param {Object} filterOption
   * @param {Object} updateData
   * @param {Function} cb
   */
  update(filterOption = {}, updateData, cb) {
    this.model.findOneAndUpdate(filterOption, updateData, { new: true }, cb);
  }
}
