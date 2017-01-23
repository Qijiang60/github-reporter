const sendJsonResponse = ({ res, status, content }) => {
  res.status(status);
  res.json(content);
};

const sendError = ({ res, error, message, status = 400 }) => {
  res.status(status);
  res.json({ error, message });
}

const githubHeaders = ({ req, token }) => ({
  'Authorization': req ? req.headers.authorization : token,
  'Accept': 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
  'User-Agent': process.env.APP_NAME || 'Github-Reporter',
});

const githubAuth = endpoint => `https://github.com/login/oauth/${endpoint}`;

const githubApi = path => `https://api.github.com/${path}`;

module.exports = {
  sendJsonResponse,
  sendError,
  githubHeaders,
  githubAuth,
  githubApi,
};
