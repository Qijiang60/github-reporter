const mongoose = require('mongoose');
const User = mongoose.model('User');

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

module.exports = {
  getUser,
};
