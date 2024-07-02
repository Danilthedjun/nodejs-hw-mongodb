import { model, Schema } from 'mongoose';
import contactTypeList from '../../constants/contacts-constants.js';
import mongooseSaveError from '../../db/models/hooks.js';
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: false,
    },
    contactType: {
      type: String,
      enum: contactTypeList,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactSchema.post('save', mongooseSaveError);
contactSchema.post('findOneAndUpdate', mongooseSaveError);

export const ContactsCollection = model('contacts', contactSchema);
