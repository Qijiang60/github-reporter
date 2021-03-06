import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import selectN from 'selectn';
import { SelectInput, selectOptions, TextInput, DirtyNotice, SavedNotice, SubmitButton } from './Inputs';
import FieldOptions from './FieldOptions';
import settingsOptions from './settingsOptions';
import { validateDateFormat, normalizeDateFormat, validateQueryState, normalizeQueryState,
  validateTimeQty, validateTimeUnit, normalizeTimeUnit, formatLabels, normalizeLabels }
  from '../../validation';
import { updateSettings } from '../../actions/session';

const leaveBlank = property => `leave blank for all ${property}s`;

const Settings = ({ exportSettings, update }) => {
  const SettingsForm = ({ handleSubmit, pristine, valid, reset, submitting, submitSucceeded }) => (
    <div className="form-container">
      <h1>
        Export Settings<br />
        <small className="small">
          Note that only issues matching <em>all</em> specified labels will be returned.<br />
        </small>
      </h1>
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
              component={SelectInput}
              label="Going back..."
              fullWidth
              validate={validateTimeQty}
            >
              {selectOptions(settingsOptions.query.since.quantity)}
            </Field>
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
              format={formatLabels}
              normalize={normalizeLabels}
            />
          </div>
        </div>
        <FieldOptions />
        <SubmitButton disabled={pristine || !valid || submitting} />
        <DirtyNotice open={!pristine && !submitting} action={handleSubmit} />
        <SavedNotice open={pristine && submitSucceeded} />
      </form>
    </div>
  );
  const ConnectedSettingsForm = reduxForm({
    form: 'settings',
    initialValues: exportSettings,
    onSubmit: update,
    destroyOnUnmount: false,
  })(SettingsForm);
  return <ConnectedSettingsForm />;
};

const mapStateToProps = ({ session }) => ({
  exportSettings: selectN('user.local.exportSettings', session),
});

export default connect(mapStateToProps, { update: updateSettings })(Settings);
