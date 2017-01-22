const sendJsonResponse = ({ res, status, content }) => {
  res.status(status);
  res.json(content);
};

const sendError = ({ res, error, message, status = 400 }) => {
  res.status(status);
  res.json({ error, message });
}

const githubHeaders = ({ req, token }) => ({
  'Authorization': req ? req.get('Authorization') : token,
  'Accept': 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
});

const githubAuth = endpoint => `https://github.com/login/oauth/${endpoint}`;

const githubApi = endpoint => `https://api.github.com/${endpoint}`;

module.exports = {
  sendJsonResponse,
  sendError,
  githubHeaders,
  githubAuth,
  githubApi,
};
