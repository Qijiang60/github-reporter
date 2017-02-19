import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox'
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

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

export const DirtyNotice = ({ open, action }) => (
  <Snackbar
    open={open}
    message="Your changes will not apply to exports until they're saved"
    autoHideDuration={60000}
    action="Save"
    onActionTouchTap={action}
  />
);

export const SavedNotice = ({ open }) => (
  <Snackbar
    open={open}
    message="Settings saved"
    autoHideDuration={5000}
  />
);

export const SubmitButton = ({ disabled }) => (
  <RaisedButton
    type="submit"
    label="Save Changes"
    primary
    disabled={disabled}
    style={{ float: 'right', marginTop: '1em', clear: 'right' }}
  />
);

export const selectOptions = options => options.map((option, index) => {
  const isOptionObject = !!option.value;
  const value = isOptionObject ? option.value : option;
  const label = isOptionObject ? option.label : capitalize(option);
  return <MenuItem value={value} primaryText={label} key={index} />;
});
