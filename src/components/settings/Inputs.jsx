import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
    {...rest}
  />
);

export const selectOptions = options => options.map(({ value, label }, index) =>
  <MenuItem value={value} primaryText={label} key={index} />);
