const request = require('request');
const qs = require('qs');
const { sendError, githubAuth } = require('./util');

const client_id = process.env.GH_CLIENT_ID;
const client_secret = process.env.GH_CLIENT_SECRET;
const redirect_uri = process.env.GH_REDIRECT_URI;
const clientRoot = process.env.CLIENT_ROOT || '';

const githubAuthRedirect = (req, res) => {
  const params = qs.stringify({
    client_id,
    scope: 'repo user', // add only-public or all-repos option, no-user option if no account desired
    redirect_uri,
  });
  res.redirect(githubAuth(`/authorize/?${params}`));
  res.end();
};

const sendRequestResponse = res => (error, response, body) => {
  if (error) {
    return sendError({ res, error, message: 'Error getting token' });
  }
  if (response.statusCode !== 200) {
    return sendError({ res, message: 'Error getting token', status: response.statusCode });
  }
  res.redirect(`${clientRoot}/token/${body.access_token}/${body.scope}`);
};

const githubCallback = (req, res) => {
  request({
    uri: githubAuth('/access_token'),
    method: 'POST',
    json: true,
    body: {
      client_id,
      client_secret,
      code: req.query.code,
      redirect_uri,
    },
  }, sendRequestResponse(res));
};

module.exports = {
  githubAuthRedirect,
  githubCallback,
};
