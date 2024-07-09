import {
  signup,
  findUser,
  createSession,
  findSession,
  deleteSession,
} from '../services/auth.js';
import createHttpError from 'http-errors';
import { compareHash } from '../utils/hash.js';

const setupResponseSession = (
  res,
  { refreshToken, _id, refreshTokenValidUntil },
) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
};
export const signupController = async (req, res) => {
  const email = req.body.email;
  const user = await findUser({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
  const newUser = await signup(req.body);

  const data = {
    name: newUser.name,
    email: newUser.email,
  };
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};

export const signinController = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password is wrong');
  }
  const isPasswordCorrect = await compareHash(password, user.password);
  if (!isPasswordCorrect) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  const session = await createSession(user._id);
  setupResponseSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const refreshController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;

  const currentSession = await findSession({ refreshToken, _id: sessionId });
  console.log(sessionId);

  if (!currentSession) {
    throw createHttpError(401, 'Unauthorized');
  }
  const refreshTokenExpires =
    new Date() > new Date(currentSession.refreshTokenValidUntil);
  if (refreshTokenExpires) {
    throw createHttpError(401, 'Session expired');
  }

  const newSession = await createSession(currentSession.userId);
  setupResponseSession(res, newSession);

  res.json({
    status: 200,
    message: 'Successfully refreshed an session!',
    data: { accessToken: newSession.accessToken },
  });
};

export const logoutController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (!sessionId) {
    throw createHttpError(401, 'Session not found');
  }

  await deleteSession({ _id: sessionId });

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
