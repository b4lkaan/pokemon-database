// src/App.js
import React, { useState } from 'react';
import DataLoader from './components/DataLoader';
import SearchBar from './components/SearchBar';
import PokemonDisplay from './components/PokemonDisplay/PokemonDisplay';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleDataLoaded = (data) => {
    setPokemonData(data);
  };

  const handleSearch = (pokemon) => {
      setSelectedPokemon(pokemon);
  };

  return (
    <div className="App">
      <DataLoader onDataLoaded={handleDataLoaded} />
      <SearchBar pokemonData={pokemonData} onSearch={handleSearch} />
      <PokemonDisplay pokemon={selectedPokemon} />
    </div>
  );
}

export default App;