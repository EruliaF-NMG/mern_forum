/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-06 10:32:29
 * @Last Modified by:   Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-06 10:32:29
 */

import mongoose from 'mongoose';

const oauthRefreshTokenSchema = new mongoose.Schema({
  revoked: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  expires_at: Date,
});

const oauthAccessTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'OauthClient',
  },
  revoked: {
    type: Boolean,
    default: false,
  },
  oauth_refresh_token: {
    type: oauthRefreshTokenSchema,
    default: oauthRefreshTokenSchema,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  expires_at: Date,
});

export default mongoose.model('OauthAccessToken', oauthAccessTokenSchema);
