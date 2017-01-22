const express = require('express');
const router = express.Router();
const { githubAuthRedirect, githubCallback } = require('../controllers/githubAuth');
const { apiRequest } = require('../controllers/github');

/* Github Authorizaton Routes */

router.get('/authorize-github', githubAuthRedirect);
router.get('/gh_callback', githubCallback);

/* Github API Routes - passthrough */

router.get('/github/:endpoint', apiRequest);

module.exports = router;
