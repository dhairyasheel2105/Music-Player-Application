import React, { useContext } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MusicContext } from '../../context/MusicContext';
import './SearchBar.scss';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(MusicContext);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="search-bar">
      <InputGroup>
        <FormControl
          placeholder="Search Song, Artist"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <InputGroup.Text className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default SearchBar;