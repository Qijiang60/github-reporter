import React from 'react';
import moment from 'moment';

const dateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'MMMM Do YYYY'];

const settingsOptions = {
  dateFormat: dateFormats.map(format => ({
    value: format,
    label: (
      <span>
        {moment().format(format)} <span style={{ color: '#AAA' }}>({format})</span>
      </span>
    ),
  })),
  query: {
    state: [{
      value: 'open',
      label: 'Open',
    }, {
      value: 'closed',
      label: 'Closed',
    }, {
      value: 'all',
      label: 'All',
    }],
    since: {
      unit: ['days', 'weeks', 'months', 'years'],
    },
  },
};

export default settingsOptions;
