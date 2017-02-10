import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import { TextInput, CheckboxInput } from './Inputs';
import settingsOptions from './settingsOptions';

const enabledExplanation = 'Included fields will appear in the export.'
const fieldExplanation = 'GitHub issue property name.'
const labelExplanation = 'The name of the column for this field in the export.'

const checkboxStyle = { width: 50 };
const nameStyle = { width: 100 };

const FieldOptions = () => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn tooltip={enabledExplanation} style={checkboxStyle}>
          Enabled
        </TableHeaderColumn>
        <TableHeaderColumn tooltip={fieldExplanation} style={nameStyle}>Field</TableHeaderColumn>
        <TableHeaderColumn tooltip={labelExplanation}>Column Label</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {settingsOptions.fields.map((fieldName, index) =>
            <FieldOption fieldName={fieldName} index={index} key={index} />)}
    </TableBody>
  </Table>
);

const FieldOption = ({ fieldName, index }) => (
  <TableRow>
    <TableRowColumn style={checkboxStyle} >
      <Field name={`fields[${index}].enabled`} component={CheckboxInput}/>
    </TableRowColumn>
    <TableRowColumn style={nameStyle}>{fieldName}</TableRowColumn>
    <TableRowColumn>
      <Field
        name={`fields[${index}].label`}
        component={TextInput}
        fullWidth
      />
    </TableRowColumn>
  </TableRow>
);

export default FieldOptions;

FieldOption.propTypes = {
  fieldName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
