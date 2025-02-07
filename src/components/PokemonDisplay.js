// src/components/PokemonDisplay.js
import React, { useState } from 'react';
import { Tabs, Tab, Table } from 'react-bootstrap';
import MovesetDisplay from './MovesetDisplay';

function PokemonDisplay({ pokemon }) {
  const [activeVariant, setActiveVariant] = useState(null);

  // set default variant when a pokemon is selected
  React.useEffect(() => {
      if(pokemon && pokemon.variants) {
          const defaultVariant = pokemon.variants.find(v => v.name.toLowerCase() === 'default') || pokemon.variants[0];
          setActiveVariant(defaultVariant);
      } else {
          setActiveVariant(null);
      }
  }, [pokemon]);

  if (!pokemon) {
    return <div>No Pokémon selected.</div>;
  }

  return (
    <div>
      <h2>{pokemon.name} (#{pokemon.national_dex_number})</h2>
      <Tabs
        activeKey={activeVariant ? activeVariant.name : ''}
        onSelect={(k) => {
            const variant = pokemon.variants.find(v => v.name === k);
            setActiveVariant(variant)
        }}
        id="pokemon-variants-tabs"
        className="mb-3"
      >
        {pokemon.variants.map((variant) => (
          <Tab eventKey={variant.name} title={variant.name} key={variant.name}>
            {/* Variant Details */}
            {variant.image_url && (
                <img src={variant.image_url} alt={variant.name} style={{ maxWidth: '200px' }} />
            )}
            <p>
              <strong>Typing:</strong> {variant.typing.join(' / ')}
            </p>
            <p>
              <strong>Abilities:</strong> {variant.abilities.join(', ')}
            </p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>HP</th>
                  <th>Attack</th>
                  <th>Defense</th>
                  <th>Sp. Atk</th>
                  <th>Sp. Def</th>
                  <th>Speed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{variant.base_stats.hp}</td>
                  <td>{variant.base_stats.attack}</td>
                  <td>{variant.base_stats.defense}</td>
                  <td>{variant.base_stats['special-attack']}</td>
                  <td>{variant.base_stats['special-defense']}</td>
                  <td>{variant.base_stats.speed}</td>
                </tr>
              </tbody>
            </Table>
            <p><strong>Evolution Chain: </strong>
            {
              variant.evolution_chain.join(' -> ')
            }</p>
            {/* Moveset Display */}
            <MovesetDisplay variant={variant} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

export default PokemonDisplay;