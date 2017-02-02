import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import selectN from 'selectn';

const TextInput = ({ input, label, meta, ...rest }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    {...input}
    {...rest}
  />
);

const Settings = ({ exportSettings }) => {
  const SettingsForm = ({ handleSubmit, pristine, reset, submitting }) => (
    <form onSubmit={handleSubmit}>
      <Field
        name="query.state"
        component={TextInput}
        label="Query State"
      />
    </form>
  );
  const ConnectedSettingsForm = reduxForm({
    form: 'settings',
    initialValues: exportSettings,
  })(SettingsForm);
  return <ConnectedSettingsForm />;
};

const mapStateToProps = ({ session }) => ({
  exportSettings: selectN('user.local.exportSettings', session),
});

export default connect(mapStateToProps)(Settings);

const Select = ({ input, label, meta, children, ...rest }) => (
  <SelectField
    floatingLabelText={label}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...rest}
  />
);
