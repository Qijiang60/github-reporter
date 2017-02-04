import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import selectN from 'selectn';
import { SelectInput, selectOptions, TextInput } from './Inputs';
import FieldOptions from './FieldOptions';
import settingsOptions from './settingsOptions';

const leaveBlank = property => `leave blank for all ${property}s`;

const Settings = ({ exportSettings }) => {
  const SettingsForm = ({ handleSubmit, pristine, reset, submitting }) => (
    <div style={{ paddingTop: '1em', paddingLeft: '1em', paddingRight: '1em' }}>
      <h1>Export Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="two-column-row">
          <div className="half-width">
            <Field name="dateFormat" component={SelectInput} label="Date Format" fullWidth>
              {selectOptions(settingsOptions.dateFormat)}
            </Field>
          </div>
          <div className="half-width">
            <Field name="query.state" component={SelectInput} label="Issue State" fullWidth>
              {selectOptions(settingsOptions.query.state)}
            </Field>
          </div>
        </div>
        <div className="two-column-row">
          <div className="half-width">
            <Field
              name="query.since.quantity"
              component={TextInput}
              label="Going back..."
              fullWidth
            />
          </div>
          <div className="half-width">
            <Field
              name="query.since.unit"
              component={SelectInput}
              label="Time Unit"
              fullWidth
            >
              {selectOptions(settingsOptions.query.since.unit)}
            </Field>
          </div>
        </div>
        <div className="two-column-row">
          <div className="half-width">
            <Field
              name="query.assignee"
              component={TextInput}
              label={`Assignee (${leaveBlank('assignee')})`}
              fullWidth
            />
          </div>
          <div className="half-width">
            <Field
              name="query.labels"
              component={TextInput}
              label={`Labels (comma separated, ${leaveBlank('label')})`}
              fullWidth
            />
          </div>
        </div>
        <FieldOptions />
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
