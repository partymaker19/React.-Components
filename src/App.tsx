import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import Results from './components/Results';
import Details from './components/Details';
import ErrorBoundary from './components/ErrorBoundary';

const centerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '20px',
};

type Result = {
  name: string;
  description: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || '',
  );
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [allResults, setAllResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = () => {
    fetch('https://swapi.dev/api/people')
      .then((response) => response.json())
      .then((data) => {
        setAllResults(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError(true);
        setLoading(false);
        setErrorMessage(error.message);
      });
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setSearching(true);
    setError(false);
    setErrorMessage('');

    if (searchTerm) {
      const filteredResults = allResults.filter((result) =>
        result.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setSearchResults(filteredResults);
      setSearching(false);
    } else {
      setSearchResults([]);
      setSearching(false);
    }

    localStorage.setItem('searchTerm', searchTerm);
  };

  const throwError = () => {
    try {
      console.error('An error has occurred. This is a test error.');
      throw new Error('Test error');
    } catch (error) {
      if (error instanceof Error) {
        setError(true);
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div style={centerStyle}>
      <Router>
        <div>
          <Search searchTerm={searchTerm} onSearch={handleSearch} />
          {searching && (
            <div style={{ textAlign: 'center' }}>
              <p>Loading...</p>
            </div>
          )}
          {error && <p>Error: {errorMessage}</p>}
          <Routes>
            <Route
              path="/"
              element={
                <Results
                  results={
                    searchResults.length > 0 ? searchResults : allResults
                  }
                  loading={loading}
                  error={errorMessage}
                />
              }
            />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </div>
      </Router>
      <button onClick={throwError}>Throw Error</button>
    </div>
  );
};

export default () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
