import list from '../constants/sort.js';

const parseSortParams = ({ sortOrder, sortBy }, fieldList) => {
  const parsedSortOrder = list.includes(sortOrder) ? sortOrder : list[0];
  const parsedSortBy = fieldList.includes(sortBy) ? sortBy : fieldList[0];

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};

export default parseSortParams;
