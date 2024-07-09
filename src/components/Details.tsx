import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface DetailsData {
  name: string;
  birth_year: string;
}

const Details = () => {
  const { id } = useParams();

  const [details, setDetails] = useState<DetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred. Please try again.</div>;
  }

  if (!details) {
    return <div>No details available for this item.</div>;
  }

  return (
    <div>
      <h2>Details</h2>
      <p>Name: {details.name}</p>
      <p>Birth Year: {details.birth_year}</p>
    </div>
  );
};

export default Details;
