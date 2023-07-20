import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../../themes/searchInput';
import { useAppContext } from '../../contexts/AppContext';

export const SearchInput = () => {
  const { setSearchQuery } = useAppContext();
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearchQuery(searchValue);
    setSearchValue('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          value={searchValue}
          onChange={handleInputChange}
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </form>
  )
}
