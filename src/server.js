import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllContacts, getContactById } from './services/contacts.js';
import { env } from './utils/env.js';

dotenv.config();
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());

  app.get('/contacts', async (req, res) => {
    const data = await getAllContacts();

    res.json({
      status: 200,
      data,
      message: 'Successfully found contacts!',
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;

      const data = await getContactById(contactId);

      if (!data) {
        return res.status(404).json({
          message: `Contact with id=${contactId} not found`,
        });
      }

      res.json({
        status: 200,
        data,
        message: `Successfully found contact with id ${contactId}!`,
      });
    } catch (error) {
      if (error.message.includes('Cast to ObjectId failed')) {
        error.status = 404;
      }
      const { status = 500 } = error;
      res.status(status).json({
        message: error.message,
      });
    }
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not Found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
