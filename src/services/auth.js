import { randomBytes } from 'node:crypto';

import { UserCollection } from '../db/models/user.js';
import { SessionCollection } from '../db/models/session.js';

import { hashValue } from '../utils/hash.js';

import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from '../constants/tokens-constants.js';

export const findUser = (filter) => UserCollection.findOne(filter);
export const findSession = (filter) => SessionCollection.findOne(filter);

export const signup = async (data) => {
  const { password } = data;
  const hashedPassword = await hashValue(password);
  return UserCollection.create({ ...data, password: hashedPassword });
};

export const createSession = async (userId) => {
  await SessionCollection.deleteOne({ userId });
  const refreshToken = randomBytes(64).toString('base64');
  console.log(refreshToken);
  const accessToken = randomBytes(64).toString('base64');

  const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_LIFETIME);
  const refreshTokenValidUntil = new Date(Date.now() + REFRESH_TOKEN_LIFETIME);

  return SessionCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
};

export const deleteSession = (filter) => SessionCollection.deleteOne(filter);
