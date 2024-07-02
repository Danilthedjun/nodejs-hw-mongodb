import contactTypeList from '../constants/contacts-constants.js';

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;

  if (!['true', 'false'].includes(value)) return;

  const parsedValue = Boolean(value);

  return parsedValue;
};

const parseFitlerParams = ({ type, isFavourite }) => {
  const parsedType = contactTypeList.includes(type) ? type : null;
  const parsedFavorite = parseBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedFavorite,
  };
};

export default parseFitlerParams;
