import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import selectN from 'selectn';
import RaisedButton from 'material-ui/RaisedButton';
import { SelectInput, selectOptions, TextInput } from './Inputs';
import FieldOptions from './FieldOptions';
import settingsOptions from './settingsOptions';
import { validateDateFormat, normalizeDateFormat, validateQueryState, normalizeQueryState,
  validateTimeUnit, normalizeTimeUnit } from '../../validation';

const leaveBlank = property => `leave blank for all ${property}s`;

const Settings = ({ exportSettings }) => {
  const SettingsForm = ({ handleSubmit, pristine, valid, reset, submitting }) => (
    <div style={{ paddingTop: '1em', paddingLeft: '1em', paddingRight: '1em' }}>
      <h1>Export Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="two-column-row">
          <div className="half-width">
            <Field
              name="dateFormat"
              component={SelectInput}
              label="Date Format"
              fullWidth
              validate={validateDateFormat}
              normalize={normalizeDateFormat}
            >
              {selectOptions(settingsOptions.dateFormat)}
            </Field>
          </div>
          <div className="half-width">
            <Field
              name="query.state"
              component={SelectInput}
              label="Issue State"
              fullWidth
              validate={validateQueryState}
              normalize={normalizeQueryState}
            >
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
              validate={validateTimeUnit}
              normalize={normalizeTimeUnit}
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
        <RaisedButton
            type="submit"
            label="Save Changes"
            primary
            disabled={pristine || !valid}
            style={{ float: 'right', marginTop: '1em', clear: 'right' }}
          />
          {!pristine && <div className="notice">
            Your changes will not apply to exports until they're saved.
          </div>}
      </form>
    </div>
  );
  const ConnectedSettingsForm = reduxForm({
    form: 'settings',
    initialValues: exportSettings,
    onSubmit: data => { console.warn('submission data', data); }
  })(SettingsForm);
  return <ConnectedSettingsForm />;
};

const mapStateToProps = ({ session }) => ({
  exportSettings: selectN('user.local.exportSettings', session),
});

export default connect(mapStateToProps)(Settings);
