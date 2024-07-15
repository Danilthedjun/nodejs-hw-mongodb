import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';

import { env } from '../utils/env.js';

const cloud_name = env('CLOUD_NAME');
const api_key = env('CLOUD_API_KEY');
const api_secret = env('CLOUD_API_SECRET');

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

const saveFile2Cloud = async (file, folder) => {
  const response = await cloudinary.uploader.upload(file.path, {
    folder,
  });
  fs.unlink(file.path);
  return response.secure_url;
};

export default saveFile2Cloud;
