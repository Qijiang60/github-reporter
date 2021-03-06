import settingsOptions, { dateFormats } from '../components/settings/settingsOptions';

const validateSelect = (options, label) => value => {
  let error;
  const isValidValue = options.find(format => format === value);
  if (!isValidValue) {
    error = `${label} is required.`;
  }
  return error;
};

const normalizeSelect = validator => (value, previousValue) =>
  validator(value) ? previousValue : value;

export const validateDateFormat = validateSelect(dateFormats, 'Date format');

export const normalizeDateFormat = normalizeSelect(validateDateFormat);

export const validateQueryState = validateSelect(
  settingsOptions.query.state,
  'Issue state'
);

export const normalizeQueryState = normalizeSelect(validateQueryState);

export const validateTimeQty = validateSelect(
  settingsOptions.query.since.quantity,
  'Amount of time'
);

export const validateTimeUnit = validateSelect(
  settingsOptions.query.since.unit,
  'Unit of time'
);

export const normalizeTimeUnit = normalizeSelect(validateTimeUnit);

export const formatLabels = (labels = []) => labels.join(',');

export const normalizeLabels = (labels = '') => labels.split(',');
