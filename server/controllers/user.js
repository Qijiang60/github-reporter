const mongoose = require('mongoose');
const User = mongoose.model('User');
const { sendJsonResponse, authorizeUser } = require('./util');

const updateOptions = {
  new: true,
  upsert: true,
  setDefaultsOnInstert: true,
};

const getUser = (githubId, cb, update) => {
  const query = { githubId };
  const updatePayload = update || { dateUpdated: Date.now() };
  User.findOneAndUpdate(query, updatePayload, updateOptions, (error, user) => {
    if(error) {
      console.log('Error getting user', error);
      return cb();
    }
    return cb(user);
  });
};

const updateSettings = (req, res) => {
  const sendUpdated = user => sendJsonResponse({ res, status: 200, content: { user } });
  getUser(req.params.githubId, sendUpdated, { exportSettings: req.body });
};

module.exports = {
  getUser,
  updateSettings: authorizeUser(updateSettings),
};
