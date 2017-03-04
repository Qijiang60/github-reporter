import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { AutoCompleteInput, searchFilter } from '../settings/Inputs';

const Search = ({ repos = [], reset }) => (
  <div>
    <Field
      name="search"
      label="Search"
      closeButton={<span onClick={reset}>x</span>}
      component={AutoCompleteInput}
      dataSource={repos.map(({ name }) => name)}
      filter={searchFilter}
    />
    <span onClick={reset}>x</span>
  </div>
);

export default reduxForm({
  form: 'search-form',
})(Search);
