import { ContactsCollection } from '../db/models/contact.js';
import calcPaginationData from '../utils/calcPaginationData.js';
import list from '../constants/sort.js';
import fieldList from '../constants/fieldList.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy = list[0],
  sortOrder = fieldList[0],
  filter,
}) => {
  const skip = (page - 1) * perPage;

  let databaseQuery = ContactsCollection.find();

  if (filter.userId) {
    databaseQuery = databaseQuery.where('userId').equals(filter.userId);
  }
  if (filter.contactType) {
    databaseQuery = databaseQuery
      .where('contactType')
      .equals(filter.contactType);
  }
  if (filter.isFavourite) {
    databaseQuery = databaseQuery
      .where('isFavourite')
      .equals(filter.isFavourite);
  }

  const items = await databaseQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  let countQuery = ContactsCollection.find();
  if (filter.contactType) {
    countQuery = countQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    countQuery = countQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const totalItems = await countQuery.countDocuments();
  const { totalPages, hasNextPage, hasPrevPage } = calcPaginationData({
    total: totalItems,
    perPage,
    page,
  });

  return {
    items,
    totalItems,
    page,
    perPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};

export const getContact = (filter) => ContactsCollection.findOne(filter);

export const addContact = (contact) => ContactsCollection.create(contact);

export const updateContact = async (contactId, contact) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    contact,
    {
      new: true,
    },
  );

  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const result = await ContactsCollection.findOneAndDelete(contactId);
  return result;
};
