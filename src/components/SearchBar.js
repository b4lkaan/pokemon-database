// src/components/SearchBar.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './SearchBar.module.css'
function SearchBar({ pokemonData, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!pokemonData || !searchTerm) {
      return; // No data or search term
    }

    const term = searchTerm.toLowerCase();

    // Search by National Dex Number (exact match)
    const dexNumberMatch = pokemonData.pokemon.find(
      (p) => p.national_dex_number === parseInt(term)
    );
    if (dexNumberMatch) {
      onSearch(dexNumberMatch);
      return;
    }

    // Search by Pokemon Name (partial and case-insensitive)
    const nameMatch = pokemonData.pokemon.find((p) =>
      p.name.toLowerCase().includes(term)
    );
    if (nameMatch) {
      onSearch(nameMatch);
      return;
    }
    onSearch(null);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group controlId="formBasicSearch" className={styles.formGroup}>
        <Form.Control
          type="text"
          placeholder="Search by Dex Number or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
      <Button variant="primary" type="submit" className={styles.button}>
        Search
      </Button>
      </Form.Group>
    </Form>
  );
}

export default SearchBar;