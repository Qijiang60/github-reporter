const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/example');
const { githubAuthRedirect, githubCallback } = require('../controllers/githubAuth');

router.get('/', sendMessage);

/* Github Authorizaton Routes */

router.get('/authorize-github', githubAuthRedirect);
router.get('/gh_callback', githubCallback);

module.exports = router;
