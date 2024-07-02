import contactTypeList from '../constants/contacts-constants.js';

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;

  if (!['true', 'false'].includes(value)) return;

  const parsedValue = Boolean(value);

  return parsedValue;
};

const parseFilterParams = ({ contactType, isFavourite }) => {
  const parsedType = contactTypeList.includes(contactType) ? contactType : null;
  const parsedFavorite = parseBoolean(isFavourite);
  return {
    contactType: parsedType,
    isFavourite: parsedFavorite,
  };
};

export default parseFilterParams;
