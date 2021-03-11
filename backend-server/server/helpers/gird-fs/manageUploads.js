import { putFile, findOne, deleteFile } from './grid-fs';

const getImage = (objectId, cb) => {
  findOne({ _id: objectId }, cb);
};

const initImage = (objectId, cb) => {
  getImage(objectId, (error, file) => {
    if (!error) {
      if (file) {
        deleteFile(objectId, cb);
      } else {
        cb(null);
      }
    } else {
      cb(error);
    }
  });
};

const uploadImage = (objectId, file, cb) => {
  if (file) {
    initImage(objectId, (error) => {
      if (!error) {
        putFile(
          file.path,
          objectId,
          file.originalname,
          { contentType: file.mimetype },
          cb
        );
      } else {
        cb(error);
      }
    });
  } else {
    cb(null);
  }
};

export { uploadImage, initImage, getImage };
