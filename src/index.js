import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
// blank
const bootStrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootStrap();
