import fs from 'node:fs/promises';
import path from 'node:path';

import { PUBLIC_DIR } from '../constants/index.js';

const saveFile2Public = async (file) => {
  const newPath = path.join(PUBLIC_DIR, file.filename);

  await fs.mkdir(path.dirname(newPath), { recursive: true });

  await fs.rename(file.path, newPath);

  return `${file.filename}`;
};

export default saveFile2Public;
