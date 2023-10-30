// Results.tsx
import React, { Component } from 'react';

interface ResultsProps {
  results: any[];
  loading: boolean;
  error: boolean;
}

const resultsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
};

const resultItemStyle = {
  width: '300px',
  margin: '5px',
  padding: '10px',
  border: '1px solid #ccc',
};

class Results extends Component<ResultsProps> {
  render() {
    const { results, loading, error } = this.props;

    if (loading) {
      return <div style={resultsContainerStyle}>Loading...</div>;
    }

    if (error) {
      return (
        <div style={resultsContainerStyle}>
          <p>An error occurred. Please try again.</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }

    return (
      <div style={resultsContainerStyle}>
        {results.map((result: any, index: number) => (
          <div key={result.name} style={resultItemStyle}>
            <p>Name: {result.name}</p>
            {result.description && <p>Description: {result.description}</p>}
            <p>Birth Year: {result.birth_year}</p>
            <p>Eye Color: {result.eye_color}</p>
            <p>Gender: {result.gender}</p>
            <p>Hair Color: {result.hair_color}</p>
            <p>Height: {result.height} cm</p>
            <p>Mass: {result.mass} kg</p>
            <p>Skin Color: {result.skin_color}</p>
            {/* Add more attributes here */}
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
