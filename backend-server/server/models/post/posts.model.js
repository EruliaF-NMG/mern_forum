/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 10:31:52
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-07 19:16:26
 */

import mongoose from 'mongoose';
import { postStatus, commentStatus } from '../../config/database-status';

const commentSchema = new mongoose.Schema({
  comment_by: {
    type: mongoose.Schema.ObjectId,
  },
  comment: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    default: commentStatus.UNBLOCKED,
  },
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

const postSchema = new mongoose.Schema({
  heading: {
    type: String,
    trim: true,
    required: 'Heading is required',
  },
  content: {
    type: String,
    trim: true,
    required: 'Content is required',
  },
  tags: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    default: postStatus.PENDING,
  },
  comments: [commentSchema],
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
  deleted_by: {
    type: mongoose.Schema.ObjectId,
    default: null,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

export default mongoose.model('Post', postSchema);
