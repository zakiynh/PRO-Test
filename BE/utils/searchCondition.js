const { Op } = require("sequelize");

function searchCondition(query) {
  const condition = {};
  if (query.fullName) {
    condition.fullName = {
      [Op.iLike]: `%${query.fullName}%`
    };
  }
  if (query.email) {
    condition.email = {
      [Op.iLike]: `%${query.email}%`
    };
  }
  if (query.registDate) {
    const dates = query.registDate.split(',');
    if (dates.length === 2) {
      condition.registDate = {
        [Op.between]: [new Date(dates[0]), new Date(dates[1])]
      };
    } else {
      const startOfDay = new Date(dates[0]);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(dates[0]);
      endOfDay.setHours(23, 59, 59, 999);

      condition.registDate = {
        [Op.between]: [startOfDay, endOfDay]
      };
    }
  }

  return condition;
}

module.exports = searchCondition;