import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootStrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootStrap();
