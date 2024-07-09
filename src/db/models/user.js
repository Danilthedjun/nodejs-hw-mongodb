import { model, Schema } from 'mongoose';
import mongooseSaveError from '../../db/models/hooks.js';
import email from '../../constants/users-constants.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: email,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.post('save', mongooseSaveError);
userSchema.post('findOneAndUpdate', mongooseSaveError);

export const UserCollection = model('user', userSchema);
