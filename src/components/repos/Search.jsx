import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { ListItem } from 'material-ui/List';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { AutoCompleteInput, searchFilter } from '../settings/Inputs';

const Search = ({ repos = [], reset }) => (
  <ListItem
    leftIcon={<SearchIcon />}
    rightIcon={<CloseIcon onClick={reset} />}
    primaryText={<Field
      name="search"
      label="Search"
      component={AutoCompleteInput}
      dataSource={repos.map(({ name }) => name)}
      filter={searchFilter}
      fullWidth
      style={{ marginTop: '-1em' }}
    />}
  />
);

export default reduxForm({
  form: 'search-form',
})(Search);
