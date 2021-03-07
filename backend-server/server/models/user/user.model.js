/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 10:31:52
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-07 13:01:22
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { userStatus } from '../../config/database-status';

const profileSchema = new mongoose.Schema({
  avata: {
    type: mongoose.Schema.ObjectId,
  },
  about: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  contact: {
    type: String,
    trim: true,
  },
  updated_at: Date,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
    required: 'First Name is required',
  },
  last_name: {
    type: String,
    trim: true,
    required: 'Last Name is required',
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    required: 'Email is required',
  },
  password: {
    type: String,
    required: 'Password is required',
  },
  status: {
    type: Boolean,
    default: userStatus.UNBLOCKED,
  },
  profile: { type: profileSchema, default: () => ({}) },
  created_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: mongoose.Schema.ObjectId,
  },
  updated_by: {
    type: mongoose.Schema.ObjectId,
  },
  updated_at: Date,
});

userSchema
  .virtual('encrypted_password')
  .set(function (password) {
    this.password = this.encryptPassword(password);
  })
  .get(() => this.password);

userSchema.methods = {
  authenticate(plainText) {
    return bcrypt.compareSync(plainText, this.password);
  },
  encryptPassword(password) {
    if (!password) return '';
    try {
      return bcrypt.hashSync(password, 10);
    } catch (err) {
      return '';
    }
  },
};

export default mongoose.model('User', userSchema);
