axios = require('axios');
require('dotenv').config();

crawler_SERVERURL = process.env.crawler_SERVERURL
const getResult = async () => {
  try {
    let res = await axios.get(crawler_SERVERURL + '/cgh', {
      headers: { "content-type": "application/json" }
    })
    return res
  } catch (error) {
    return handle_Error(error);
  }
};

module.exports = { getResult }