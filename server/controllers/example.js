const { sendJsonResponse } = require('./util');

const sendMessage = (req, res) => sendJsonResponse({ res, status: 200, content: {
  message: 'Data received from API',
}});

module.exports = { sendMessage };
