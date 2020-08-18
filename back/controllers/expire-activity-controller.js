const ExpireActivity = require("../models/expire-activity-model");
const HttpResponse = require("../models/http-response");

const getExpireActivities = async (req, res, next) => {
  try {
    const result = await ExpireActivity.find();
    const response = new HttpResponse(
      result,
      200,
      `all expireActivities successfully fetched!`
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = { getExpireActivities };
