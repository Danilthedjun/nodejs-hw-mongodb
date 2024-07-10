import {
  getAllContacts,
  getContact,
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
  const { _id: userId } = req.user;
  const { query } = req;
  const { page, perPage } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query, fieldList);
  const filter = { ...parseFilterParams(query), userId };

  try {
    const data = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

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
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const data = await getContact({ _id: contactId, userId });
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
  const { _id: userId } = req.user;
  const data = await addContact({ ...req.body, userId });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await updateContact({ _id: contactId, userId }, req.body);

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
  const { _id: userId } = req.user;
  const result = await deleteContact({ _id: contactId, userId });
  if (!result) {
    throw createHttpError(404, { message: 'Contact not found' });
  }
  res.status(204).end();
};
