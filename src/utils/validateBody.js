import createHttpError from 'http-errors';

const validateBody = (schema) => async (req, res, next) => {
  try {
    const body = req.body;
    await schema.validateAsync(body, { abortEarly: false });
    next();
  } catch (error) {
    next(createHttpError(400, error.message));
  }
};

export default validateBody;
