import { ContactsCollection } from '../db/models/contact.js';
import calcPagnationData from '../utils/calcPaginationData.js';
import list from '../constants/sort.js';
import fieldList from '../constants/fieldList.js';

export const getAllContacts = async ({
  filter,
  page,
  perPage,
  sortBy = list[0],
  sortOrder = fieldList[0],
}) => {
  const skip = (page - 1) * perPage;

  const databaseQuery = ContactsCollection.find();
  if (filter.type) {
    databaseQuery.where('type').equals(filter.type);
  }
  if (filter.favorite) {
    databaseQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const data = await databaseQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactsCollection.find()
    .merge(databaseQuery)
    .countDocuments();

  const { totalPages, hasNextPage, hasPreviousPage } = calcPagnationData({
    total: totalItems,
    page,
    perPage,
  });

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};
export const getContactById = (contactId) =>
  ContactsCollection.findById(contactId);

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
