import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = () => ContactsCollection.find();
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
