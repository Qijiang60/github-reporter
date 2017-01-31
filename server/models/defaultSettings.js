const defaultSettings = {
  dateFormat: 'MM/DD/YYYY',
  query: {
    state: 'open',
    since: {
      quantity: 1,
      unit: 'year',
    },
    assignee: null,
    labels: null,
  },
  fields: [{
    name: 'title',
    label: 'Title',
    enabled: true,
  }, {
    name: 'number',
    label: 'Issue Number',
    enabled: true,
  }, {
    name: 'created',
    label: 'Created',
    type: 'date',
    enabled: true,
  }, {
    name: 'updated',
    label: 'Last Updated',
    type: 'date',
    enabled: true,
  }, {
    name: 'state',
    label: 'State',
    enabled: true,
  }, {
    name: 'body',
    label: 'Body',
    truncate: true,
    enabled: true,
  }, {
    name: 'labels',
    label: 'Labels',
    enabled: true,
  }],
};

module.exports = defaultSettings;
