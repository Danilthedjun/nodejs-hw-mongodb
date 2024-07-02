import {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

import createHttpError from 'http-errors';

import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import fieldList from '../constants/fieldList.js';
import parseFilterParams from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res) => {
  const { query } = req;
  const { page, perPage } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query, fieldList);
  const filter = parseFilterParams(query);

  try {
    console.log('Request Query:', query);
    console.log('Parsed Params:', {
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    const data = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    console.log('Response Data:', data);

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    throw createHttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    status: 200,
    data,
    message: `Successfully found contact with id ${contactId}!`,
  });
};

export const addContactController = async (req, res) => {
  const data = await addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await updateContact(contactId, req.body);

  if (!data) {
    throw createHttpError(404, { message: 'Contact not found' });
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await deleteContact(contactId);
  if (!result) {
    throw createHttpError(404, { message: 'Contact not found' });
  }
  res.status(204).end();
};
