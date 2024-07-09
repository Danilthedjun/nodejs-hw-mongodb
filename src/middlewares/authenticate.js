import { findSession, findUser } from '../services/auth.js';
import createHttpError from 'http-errors';

const authenticate = async (req, res, next) => {
  const autHeader = req.get('Authorization');
  if (!autHeader) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const [bearer, accessToken] = autHeader.split(' ');
  if (bearer !== 'Bearer') {
    return next(createHttpError(401, 'Token must be Bearer'));
  }
  if (!accessToken) {
    return next(createHttpError(401, 'Token missing'));
  }

  const session = await findSession({ accessToken });
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }
  const sessionTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (sessionTokenExpired) {
    return next(createHttpError(401, 'Access token expired'));
  }
  const user = await findUser({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }

  req.user = user;
  next();
};

export default authenticate;
