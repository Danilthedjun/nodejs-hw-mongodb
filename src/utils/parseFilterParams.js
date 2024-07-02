import contactTypeList from '../constants/contacts-constants.js';

const parseBoolean = (value) => {
  if (typeof value !== 'string') return undefined;

  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }

  return undefined;
};

const parseFilterParams = ({ contactType, isFavourite }) => {
  const parsedType = contactTypeList.includes(contactType) ? contactType : null;
  const parsedFavorite = parseBoolean(isFavourite);

  console.log('Parsed Filter Params:', {
    contactType: parsedType,
    isFavourite: parsedFavorite,
  });

  return {
    contactType: parsedType,
    isFavourite: parsedFavorite,
  };
};

export default parseFilterParams;
