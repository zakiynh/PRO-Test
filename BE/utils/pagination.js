function getPagination(query) {
  const limit = parseInt(query.limit) || 10;
  const page = parseInt(query.page) || 1;
  const offset = (page - 1) * limit;

  return { limit, offset, page };
}

module.exports = getPagination;