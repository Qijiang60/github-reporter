import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox'
import MenuItem from 'material-ui/MenuItem';

const capitalize = str => 
  typeof str === 'string' ? `${str.charAt(0).toLocaleUpperCase()}${str.slice(1)}` : str;

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
  const isOptionObject = !!option.value;
  const value = isOptionObject ? option.value : option;
  const label = isOptionObject ? option.label : capitalize(option);
  return <MenuItem value={value} primaryText={label} key={index} />;
});
  