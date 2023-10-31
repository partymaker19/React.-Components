// // App.tsx
// import React, { Component } from 'react';
// import Search from './components/Search';
// import Results from './components/Results';
// import ErrorBoundary from './components/ErrorBoundary';

// const centerStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   flexDirection: 'column' as const,
//   gap: '20px',
// };

// type Result = {
//   name: string;
//   birth_year: string;
//   eye_color: string;
//   gender: string;
//   hair_color: string;
//   height: string;
//   mass: string;
//   skin_color: string;
// };

// class App extends Component {
//   state = {
//     searchTerm: localStorage.getItem('searchTerm') || '',
//     searchResults: [],
//     allResults: [] as Result[],
//     loading: true,
//     error: false,
//     errorMessage: '',
//   };

//   componentDidMount() {
//     this.fetchAllData();
//   }

//   fetchAllData = () => {
//     fetch('https://swapi.dev/api/people')
//       .then((response) => response.json())
//       .then((data) => {
//         this.setState({ allResults: data.results, loading: false });
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         this.setState({
//           error: true,
//           loading: false,
//           errorMessage: error.message,
//         });
//       });
//   };

//   handleSearch = (searchTerm: string) => {
//     this.setState({
//       searchTerm,
//       loading: false,
//       error: false,
//       errorMessage: '',
//     });

//     if (searchTerm) {
//       const filteredResults = this.state.allResults.filter((result) =>
//         result.name.toLowerCase().includes(searchTerm.toLowerCase()),
//       );

//       this.setState({ searchResults: filteredResults });
//     } else {
//       this.setState({ searchResults: [] });
//     }

//     localStorage.setItem('searchTerm', searchTerm);
//   };

//   throwError = () => {
//     console.error('An error has occurred. This is a test error.');
//     try {
//       throw new Error('Test error');
//     } catch (error) {
//       this.setState({ error: true, errorMessage: (error as Error).message });
//     }
//   };

//   render() {
//     const {
//       searchTerm,
//       searchResults,
//       loading,
//       error,
//       errorMessage,
//       allResults,
//     } = this.state;

//     return (
//       <div style={centerStyle}>
//         <div>
//           <Search onSearch={this.handleSearch} initialSearchTerm={searchTerm} />
//           {searching && <p>Loading...</p>}
//           {error && <p>Error: {errorMessage}</p>}

//           <Results
//             results={searchResults.length > 0 ? searchResults : allResults}
//             loading={loading}
//             error={error}
//           />
//         </div>
//         <button onClick={this.throwError}>Throw Error</button>
//       </div>
//     );
//   }
// }

// export default () => (
//   <ErrorBoundary>
//     <App />
//   </ErrorBoundary>
// );

import React, { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import ErrorBoundary from './components/ErrorBoundary';

const centerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column' as const,
  gap: '20px',
};

type Result = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
};

class App extends Component {
  state = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    searchResults: [],
    allResults: [] as Result[],
    loading: true,
    error: false,
    errorMessage: '',
    searching: false,
  };

  componentDidMount() {
    this.fetchAllData();
  }

  async fetchAllData() {
    try {
      const response = await fetch('https://swapi.dev/api/people');
      const data = await response.json();
      this.setState({
        allResults: data.results,
        loading: false,
      });
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        this.setState({
          error: true,
          loading: false,
          errorMessage: error.message,
        });
      }
    }
  }

  async handleSearch(searchTerm: string) {
    this.setState({
      searchTerm,
      searchResults: [],
      error: false,
      errorMessage: '',
      searching: true,
    });

    if (searchTerm) {
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?search=${searchTerm}`,
        );
        const data = await response.json();
        this.setState({
          searchResults: data.results,
          searching: false,
        });
      } catch (error) {
        console.error('Error:', error);
        if (error instanceof Error) {
          this.setState({
            error: true,
            errorMessage: error.message,
            searching: false,
          });
        }
      }
    } else {
      this.setState({ searching: false });
    }

    localStorage.setItem('searchTerm', searchTerm);
  }

  throwError = () => {
    try {
      console.error('An error has occurred. This is a test error.');
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
      searching,
    } = this.state;

    return (
      <div style={centerStyle}>
        <div>
          <Search
            onSearch={this.handleSearch.bind(this)}
            initialSearchTerm={searchTerm}
          />
          {searching && <p style={{ textAlign: 'center' }}>Loading...</p>}
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
