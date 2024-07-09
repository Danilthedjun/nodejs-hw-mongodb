import { model, Schema } from 'mongoose';
import mongooseSaveError from '../../db/models/hooks.js';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

sessionSchema.post('save', mongooseSaveError);
sessionSchema.post('findOneAndUpdate', mongooseSaveError);

export const SessionCollection = model('sessions', sessionSchema);
