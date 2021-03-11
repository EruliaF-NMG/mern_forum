/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-11 18:41:05
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-11 18:41:56
 */

import mongoose from 'mongoose';
import fs from 'fs';

/**
 * @Author: Nisal Madusanka(EruliaF)
 * @description Add New File To mongo GridFS Store...
 * @param {String} filePath uploaded File parth
 * @param {ObjectId} ObjectId primary key
 * @param {String} fileName File name
 * @param {chunkSizeBytes:null,metadata:null,contentType:null,aliases:null,disableMD5:false} options
 * @param {function} cb callback Function
 */
const putFile = (filePath, ObjectId, fileName, options, cb) => {
  const dbObj = mongoose.connection.db;
  const bucket = new mongoose.mongo.GridFSBucket(dbObj);

  fs.createReadStream(filePath)
    .pipe(bucket.openUploadStreamWithId(ObjectId, fileName, options))
    .on('error', (error) => {
      cb(error);
    })
    .on('finish', () => {
      cb(null);
    });
};

const sendFileToResponce = (id, res, cb) => {
  const dbObj = mongoose.connection.db;
  const bucket = new mongoose.mongo.GridFSBucket(dbObj);

  bucket
    .openDownloadStream(id)
    .pipe(res)
    .on('error', (error) => {
      cb(error);
    });
};

const findOne = (filter, cb) => {
  const dbObj = mongoose.connection.db;
  dbObj.collection('fs.files').findOne(filter, (error, result) => {
    if (error) {
      cb(error);
    } else {
      cb(null, result);
    }
  });
};

const deleteFile = (objectID, cb) => {
  const dbObj = mongoose.connection.db;
  const bucket = new mongoose.mongo.GridFSBucket(dbObj);
  bucket.delete(objectID, (error) => {
    if (error) {
      cb(error);
    } else {
      cb(null);
    }
  });
};

export { putFile, sendFileToResponce, findOne, deleteFile };
