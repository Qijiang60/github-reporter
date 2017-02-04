const request = require('request');

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

// verify the logged in GitHub account matches the local account
// would probably be good to middleware-ize this
const authorizeUser = cb => (req, res) => {
  request({
    uri: `${githubApi}user`,
    headers: githubHeaders({ req }),
  }, (error, response, githubResponse) => {
    if (error || response.statusCode !== 200) {
      sendError({ res, error });
    }
    if (req.body.githubId !== githubResponse.id) {
      return sendError({ res, status: 401, message: 'You are not authorized to perform this action'});
    }
    return cb(req, res);
  });
};

module.exports = {
  sendJsonResponse,
  sendError,
  githubHeaders,
  githubAuth,
  githubApi,
  authorizeUser,
};
