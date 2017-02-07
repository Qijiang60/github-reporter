const mongoose = require('mongoose');
const defaultSettings = require('./defaultSettings');

const fieldsSchema = mongoose.Schema([{
  name: { type: String, required: true },
  label: { type: String, required: true },
  enabled: { type: Boolean, default: true },
  type: String,
  truncate: Boolean,
}]);

const userSchema = mongoose.Schema({
  githubId: { type: Number, required: true },
  dateCreated: { type: String, default: Date.now() },
  dateUpdated: { type: String, default: Date.now() },
  exportSettings: {
    dateFormat: { type: String, default: defaultSettings.dateFormat },
    query: {
      state: { type: String, default: defaultSettings.query.state },
      since: {
        quantity: { type: Number, default: defaultSettings.query.since.quantity },
        unit: { type: String, default: defaultSettings.query.since.unit },
      },
      assignee: String,
      labels: [String],
    },
    fields: { type: Array, default: defaultSettings.fields },
  },
});

module.exports = mongoose.model('User', userSchema);
