// src/components/MovesetDisplay.js (Modified with CSS Modules)
import React, { useState, useEffect } from 'react';
import { Dropdown, Table } from 'react-bootstrap';
import styles from './MovesetDisplay.module.css'; // Import CSS Module

function MovesetDisplay({ variant }) {
    // ... (rest of your MovesetDisplay logic remains the same) ...
    const [selectedMoveset, setSelectedMoveset] = useState(null);
    const [movesetNames, setMovesetNames] = useState([]); // Store moveset names here

    useEffect(() => {
      // Calculate moveset names *inside* useEffect
      const tiers = [];
      for (const key in variant) {
        if (typeof variant[key] === 'object' && !Array.isArray(variant[key]) && key !== 'base_stats') {
          tiers.push(key);
        }
      }

      const calculatedMovesetNames = tiers.reduce((acc, tier) => {
        for (const movesetName in variant[tier]) {
          acc.push({ tier, movesetName });
        }
        return acc;
      }, []);

      setMovesetNames(calculatedMovesetNames); // Update state

      // Set default moveset *inside* useEffect, after movesetNames are calculated
      if (calculatedMovesetNames.length > 0) {
        setSelectedMoveset(variant[calculatedMovesetNames[0].tier][calculatedMovesetNames[0].movesetName]);
      } else {
        setSelectedMoveset(null);
      }
    }, [variant]); // Dependency array ensures this runs when variant changes


    const handleMovesetSelect = (tier, movesetName) => {
      setSelectedMoveset(variant[tier][movesetName]);
    };

    if (movesetNames.length === 0) {
      return <p>No competitive movesets available.</p>;
    }

    return (
      <div className={styles.movesetDisplay}>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {selectedMoveset ? `${selectedMoveset.name || 'Select Moveset'}` : 'Select Moveset'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {movesetNames.map(({ tier, movesetName }) => (
              <Dropdown.Item
                key={`${tier}-${movesetName}`}
                onClick={() => handleMovesetSelect(tier, movesetName)}
              >
                {`${tier}: ${movesetName}`}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {selectedMoveset && (
          <div className={styles.movesetCard}>
            <h4>{selectedMoveset.name}</h4>
            <p><strong>Moves:</strong></p>
              <ul>
                {selectedMoveset.moves.map((move, index) => (
                  <li key={index}>
                    {Array.isArray(move) ? move.join(' / ') : move}
                  </li>
                ))}
              </ul>
            <p><strong>Ability:</strong> {selectedMoveset.ability}</p>
            <p>
              <strong>Item:</strong>{' '}
              {Array.isArray(selectedMoveset.item)
                ? selectedMoveset.item.join(' / ')
                : selectedMoveset.item}
            </p>
            <p>
              <strong>Nature:</strong>{' '}
              {Array.isArray(selectedMoveset.nature)
                ? selectedMoveset.nature.join(' / ')
                : selectedMoveset.nature}
            </p>
            <p>
              <strong>Tera Types: </strong>
              {Array.isArray(selectedMoveset.teratypes) ? selectedMoveset.teratypes.join(' / ') : selectedMoveset.teratypes}
            </p>
            {selectedMoveset.evs && (
              <>
              <h5>EVs</h5>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    {Object.keys(selectedMoveset.evs).map((stat) => (
                      <th key={stat}>{stat.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {Object.values(selectedMoveset.evs).map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                  </tr>
                </tbody>
              </Table>
              </>
            )}
            {selectedMoveset.ivs && (
              <>
              <h5>IVs</h5>
              <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      {Object.keys(selectedMoveset.ivs).map(stat => <th key={stat}>{stat.toUpperCase()}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.values(selectedMoveset.ivs).map((iv, index) => <td key={index}>{iv}</td>)}
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </div>
        )}
      </div>
    );
}

export default MovesetDisplay;