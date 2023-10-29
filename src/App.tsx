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
  gap: '30px',
};

class App extends Component {
  state = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    searchResults: [],
    loading: false,
    error: false,
    errorMessage: '',
  };

  handleSearch = (searchTerm: string) => {
    searchTerm = searchTerm.trim();
    this.setState({ searchTerm, loading: true });

    localStorage.setItem('searchTerm', searchTerm);

    fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ searchResults: data.results, loading: false });
      })
      .catch((error) => {
        console.error('Ошибка:', error);
        this.setState({
          error: true,
          loading: false,
          errorMessage: error.message,
        });
      });
  };

  throwError = () => {
    try {
      throw new Error('Test error');
    } catch (error) {
      this.setState({ error: true, errorMessage: (error as Error).message });
    }
  };

  render() {
    const { searchTerm, searchResults, loading, error, errorMessage } =
      this.state;

    return (
      <div style={centerStyle}>
        <Search onSearch={this.handleSearch} initialSearchTerm={searchTerm} />
        {error && <p>Error: {errorMessage}</p>}
        <Results results={searchResults} loading={loading} error={error} />
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
