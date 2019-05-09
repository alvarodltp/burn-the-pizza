import React from 'react';
import { Input } from 'semantic-ui-react'

const SearchBar = (props) => <Input onChange={props.getSearchOptions} size='big' fluid icon='search' placeholder='Search Food or Drink...' />

export default SearchBar
