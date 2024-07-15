import molter from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';
import createHttpError from 'http-errors';

const storage = molter.diskStorage({
  destination: TEMP_UPLOAD_DIR,
  filename: function (req, file, cb) {
    const uniq = Date.now();
    const filename = `${uniq}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = { fileSize: 5 * 1024 * 1024 };

const fileFilter = (req, file, cb) => {
  const fileTipe = file.originalname.split('.').pop();
  if (fileTipe === 'exe') {
    return cb(createHttpError(400, 'File type not allowed'));
  }
  cb(null, true);
};

const upload = molter({ storage, limits, fileFilter });

export default upload;
