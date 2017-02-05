import settingsOptions, { dateFormats } from '../components/settings/settingsOptions';

const validateSelect = (options, errorMessage) => value => {
  let error;
  const isValidValue = options.find(format => format === value);
  if (!isValidValue) {
    error = errorMessage;
  }
  return error;
};

const normalizeSelect = validator => (value, previousValue) =>
  validator(value) ? previousValue : value;

export const validateDateFormat = validateSelect(dateFormats, 'Date format is required.');

export const normalizeDateFormat = normalizeSelect(validateDateFormat);

export const validateQueryState = validateSelect(
  settingsOptions.query.state,
  'Issue state is required'
);

export const normalizeQueryState = normalizeSelect(validateQueryState);

export const validateTimeUnit = validateSelect(
  settingsOptions.query.since.unit,
  'Unit of time is required'
);

export const normalizeTimeUnit = normalizeSelect(validateTimeUnit);
