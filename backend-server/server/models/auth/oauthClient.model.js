/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 10:33:26
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-06 12:28:45
 */

import mongoose from 'mongoose';

const oauthClientSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  client_code: {
    type: String,
    trim: true,
    unique: 'Client code already exists',
    required: 'Client code is required',
  },
  secret: {
    type: String,
    trim: true,
    unique: 'Client secret already exists',
    required: 'Client secret is required',
  },
  revoked: {
    type: Boolean,
    default: false,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('OauthClient', oauthClientSchema);
