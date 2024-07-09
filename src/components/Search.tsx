import React, { useState } from 'react';

const searchStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '10px',
  height: '30vh',
};

interface SearchProps {
  searchTerm: string;
  onSearch: (searchValue: string) => void;
}

const Search = ({ searchTerm, onSearch }: SearchProps) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div style={searchStyle}>
      <h2>STAR WARS People</h2>
      <p>Enter name. Example: Luke or Darth</p>
      <input
        type="text"
        placeholder="Search term"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
