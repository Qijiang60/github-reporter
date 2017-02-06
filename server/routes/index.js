const express = require('express');
const router = express.Router();
const { githubAuthRedirect, githubCallback } = require('../controllers/githubAuth');
const { apiRequest, getGithubUser } = require('../controllers/github');
const { exportIssues } = require('../controllers/export');
const { updateSettings } = require('../controllers/user');

/* Github Authorizaton Routes */

router.get('/authorize-github', githubAuthRedirect);
router.get('/gh_callback', githubCallback);

/* Github API Routes - passthrough */

router.get('/github/user', getGithubUser);
router.get('/github/*', apiRequest);

/* User routes */
router.put('/user/:githubId/exportSettings', updateSettings);

/* Export Routes */

router.get('/export/issues', exportIssues);

module.exports = router;
