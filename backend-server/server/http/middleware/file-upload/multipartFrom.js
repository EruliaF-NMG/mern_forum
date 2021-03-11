import multer from 'multer';

const fileUpload = multer({ dest: './tmp/' });

// eslint-disable-next-line import/prefer-default-export
export { fileUpload };
