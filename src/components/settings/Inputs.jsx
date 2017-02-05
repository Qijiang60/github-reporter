import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox'
import MenuItem from 'material-ui/MenuItem';

const capitalize = str => `${str.charAt(0).toLocaleUpperCase()}${str.slice(1)}`;

export const TextInput = ({ input, label, meta, ...rest }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    {...input}
    {...rest}
  />
);

export const SelectInput = ({ input, label, meta, children, ...rest }) => (
  <SelectField
    floatingLabelText={label}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    errorText={meta.error}
    {...rest}
  />
);

export const CheckboxInput = ({ input, label, meta, ...rest }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
    {...rest}
  />
);

export const selectOptions = options => options.map((option, index) => {
  const isStringOption = typeof option === 'string';
  const value = isStringOption ? option : option.value;
  const label = isStringOption ? capitalize(option) : option.label;
  return <MenuItem value={value} primaryText={label} key={index} />;
});
  