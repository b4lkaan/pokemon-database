// src/components/DataLoader.js
import React, { useState, useEffect } from 'react';

function DataLoader({ onDataLoaded }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/updated_pokemon_database.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        onDataLoaded(data); // Pass the data to the parent component
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [onDataLoaded]);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return null; // Render nothing once data is loaded
}

export default DataLoader;