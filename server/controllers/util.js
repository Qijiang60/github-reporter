const request = require('request');

const sendJsonResponse = ({ res, status, content }) => {
  res.status(status);
  res.json(content);
};

const sendError = ({ res, error, message, meta, status = 400 }) => {
  res.status(status);
  res.json({ error, message, meta });
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
  const requestOptions = {
    uri: githubApi('user'),
    headers: githubHeaders({ req }),
  };
  request(requestOptions, (error, response, githubResponse) => {
    if (error || response.statusCode !== 200) {
      return sendError({ res, error, status: 400, message: 'Error getting data from GitHub', });
    }
    if (!githubResponse) {
      return sendError({ res, message: 'No response from GitHub', status: 400 });
    }
    const body = JSON.parse(githubResponse);
    if (parseInt(req.params.githubId, 10) !== parseInt(body.id, 10)) {
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
