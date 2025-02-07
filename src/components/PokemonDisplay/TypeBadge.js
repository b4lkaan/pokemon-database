// src/components/PokemonDisplay/TypeBadge.js
import React from 'react';
import styles from './TypeBadge.module.css'; // Import CSS Module

const typeColors = {
  grass: '#78c850',
  poison: '#a040a0',
  fire: '#f08030',
  flying: '#a890f0',
  water: '#6890f0',
  bug: '#a8b820',
  normal: '#a8a878',
  electric: '#f8d030',
  ground: '#e0c068',
  fairy: '#ee99ac',
  fighting: '#c03028',
  psychic: '#f85888',
  rock: '#b8a038',
  steel: '#b8b8d0',
  ice: '#98d8d8',
  ghost: '#705898',
  dragon: '#7038f8',
  dark: '#705848',
};

function TypeBadge({ type }) {
  const backgroundColor = typeColors[type.toLowerCase()] || '#777'; // Default color

  return (
    <span className={styles.typeBadge} style={{ backgroundColor }}>
      {type}
    </span>
  );
}

export default TypeBadge;