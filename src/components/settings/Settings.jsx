import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import selectN from 'selectn';
import { SelectInput, selectOptions } from './Inputs';
import settingsOptions from './settingsOptions';

const Settings = ({ exportSettings }) => {
  const SettingsForm = ({ handleSubmit, pristine, reset, submitting }) => (
    <div style={{ paddingTop: '1em', paddingLeft: '1em', paddingRight: '1em' }}>
      <form onSubmit={handleSubmit}>
        <Field name="dateFormat" component={SelectInput} label="Date Format" fullWidth>
          {selectOptions(settingsOptions.dateFormat)}
        </Field>
        <Field name="query.state" component={SelectInput} label="Issue State" fullWidth>
          {selectOptions(settingsOptions.query.state)}
        </Field>
      </form>
    </div>
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
