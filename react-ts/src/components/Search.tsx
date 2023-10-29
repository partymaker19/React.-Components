// Search.tsx
import React, { Component } from 'react';

interface SearchProps {
  initialSearchTerm?: string;
  onSearch: (searchTerm: string) => void;
}

const searchStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column' as 'column',
  gap: '10px',
  height: '45vh',
};

class Search extends Component<SearchProps> {
  state = {
    searchTerm: this.props.initialSearchTerm || '',
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.searchTerm);
  };

  render() {
    return (
      <div style={searchStyle}>
        <h2>STAR WARS People</h2>
        <p>Enter name. Example: Luke or Darth</p>
        <input
          type="text"
          placeholder="Search term"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
