import React from 'react';
import moment from 'moment';

export const dateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'MMMM Do YYYY'];

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
    state: ['open', 'closed', 'all'],
    since: {
      quantity: ([...Array(37).keys()]).filter(n => n !== 0),
      unit: ['days', 'weeks', 'months', 'years'],
    },
  },
  fields: ['title', 'number', 'created', 'updated', 'state', 'body', 'labels'],
};

export default settingsOptions;
