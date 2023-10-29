// App.tsx
import React, { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import ErrorBoundary from './components/ErrorBoundary';

const centerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column' as 'column',
  gap: '20px',
};

type Result = {
  name: string;
};

class App extends Component {
  state = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    searchResults: [],
    allResults: [] as Result[],
    loading: true,
    error: false,
    errorMessage: '',
  };

  componentDidMount() {
    this.fetchAllData();
  }

  fetchAllData = () => {
    fetch('https://swapi.dev/api/people/')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ allResults: data.results, loading: false });
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({
          error: true,
          loading: false,
          errorMessage: error.message,
        });
      });
  };

  handleSearch = (searchTerm: string) => {
    this.setState({
      searchTerm,
      loading: false,
      error: false,
      errorMessage: '',
    });

    if (searchTerm) {
      const filteredResults = this.state.allResults.filter((result) =>
        result.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      this.setState({ searchResults: filteredResults });
    } else {
      this.setState({ searchResults: [] });
    }

    localStorage.setItem('searchTerm', searchTerm);
  };

  throwError = () => {
    try {
      throw new Error('Test error');
    } catch (error) {
      this.setState({ error: true, errorMessage: (error as Error).message });
    }
  };

  render() {
    const {
      searchTerm,
      searchResults,
      loading,
      error,
      errorMessage,
      allResults,
    } = this.state;

    return (
      <div style={centerStyle}>
        <div>
          <Search onSearch={this.handleSearch} initialSearchTerm={searchTerm} />
          {error && <p>Error: {errorMessage}</p>}
          <Results
            results={searchResults.length > 0 ? searchResults : allResults}
            loading={loading}
            error={error}
          />
        </div>
        <button onClick={this.throwError}>Throw Error</button>
      </div>
    );
  }
}

export default () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
