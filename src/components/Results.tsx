// Results.tsx
import React, { Component } from 'react';

interface ResultsProps {
  results: any[];
  loading: boolean;
  error: boolean;
}

const resultsStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

class Results extends Component<ResultsProps> {
  render() {
    const { results, loading, error } = this.props;

    if (loading) {
      return <div style={resultsStyle}>Loading...</div>;
    }

    if (error) {
      return (
        <div style={resultsStyle}>
          <p>An error occurred. Please try again.</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }

    return (
      <div style={resultsStyle}>
        {results.map((result: any) => (
          <div key={result.name}>
            <p>Name: {result.name}</p>
            {/* Add more details here */}
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
