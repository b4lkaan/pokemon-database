// src/components/PokemonDisplay/StatBar.js
import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import styles from './StatBar.module.css';

function StatBar({ statName, statValue }) {
  const statPercentage = (statValue / 255) * 100;
  const shortStatName =
    statName === 'special-attack'
      ? 'Sp. Atk'
      : statName === 'special-defense'
      ? 'Sp. Def'
      : statName;

  const renderTooltip = (props) => (
    <Tooltip id={`tooltip-${statName}`} {...props}>
      {statValue}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={renderTooltip}>
      <div className={styles.statBarContainer}>
        <div className={styles.statLabel}>{shortStatName.toUpperCase()}</div>
        <div className={styles.bar}>
          <div
            className={styles.barFill}
            style={{ width: `${statPercentage}%` }}
          ></div>
        </div>
        <div className={styles.statValue}>{statValue}</div> {/* Display stat value */}
      </div>
    </OverlayTrigger>
  );
}

export default StatBar;