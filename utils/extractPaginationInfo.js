const DEFAULT_LIMIT = 5;
const DEFAULT_PAGE = 1;
const extractPaginationInfo = (queryParams) => {
  // extract pagination info
  let page = queryParams.page;
  if (!page || page < 1) page = DEFAULT_PAGE;

  const limit = queryParams.limit ? queryParams.limit : DEFAULT_LIMIT;

  // remove pagination info from the object
  delete queryParams.page;
  delete queryParams.limit;

  return [{ page, limit }, queryParams];
};

module.exports = extractPaginationInfo;
