// src/components/PokemonDisplay/PokemonDisplay.js
import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import MovesetDisplay from './MovesetDisplay'; // Adjust path if needed
import TypeBadge from './TypeBadge';
import StatBar from './StatBar';
import styles from './PokemonDisplay.module.css'; // Import CSS Module
import { FaArrowRight } from 'react-icons/fa';

function PokemonDisplay({ pokemon }) {
    const [activeVariant, setActiveVariant] = useState(null);

    useEffect(() => {
        if (pokemon && pokemon.variants) {
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
        <div className={styles.pokemonDisplay}>
            <h2 className={styles.pokemonName}>{pokemon.name}</h2>
            <p className={styles.pokemonDexNumber}>#{pokemon.national_dex_number}</p>

            <Tabs
                activeKey={activeVariant ? activeVariant.name : ''}
                onSelect={(k) => {
                    const variant = pokemon.variants.find(v => v.name === k);
                    setActiveVariant(variant);
                }}
                id="pokemon-variants-tabs"
                className={styles.variantTabs}
            >
                {pokemon.variants.map((variant) => (
                    <Tab eventKey={variant.name} title={variant.name} key={variant.name}>
                        <div className={styles.variantContent}>
                            {variant.image_url && (
                                <img src={variant.image_url} alt={variant.name} className={styles.pokemonImage} />
                            )}
                            <div className={styles.infoSection}>
                                <div className={styles.types}>
                                    <strong>Typing:</strong>
                                    {variant.typing.map((type) => (
                                        <TypeBadge key={type} type={type} />
                                    ))}
                                </div>
                                <div className={styles.abilities}>
                                    <strong>Abilities:</strong>
                                    {variant.abilities.map((ability) => {
                                        const isHidden = ability.toLowerCase().includes('(hidden)');
                                        const abilityName = ability.replace('(Hidden)', '').trim();
                                        return (
                                          <span key={abilityName} className={`${styles.ability} ${isHidden ? styles.hiddenAbility : ''}`}>
                                              {abilityName} {isHidden ? '(Hidden)' : ''}
                                          </span>
                                        );
                                    })}
                                </div>
                                {/* Base Stats (using StatBar component) */}
                                <div className={styles.stats}>
                                    <h4>Base Stats</h4>
                                    {Object.entries(variant.base_stats).map(([statName, statValue]) => (
                                        <StatBar key={statName} statName={statName} statValue={statValue} />
                                    ))}
                                </div>
                                 <div className={styles.evolutionChain}>
                                    <strong>Evolution Chain: </strong>
                                    {
                                    variant.evolution_chain.map((evo, index) => (
                                        <React.Fragment key={evo}>
                                            <div className={styles.evolutionPokemon}>
                                                <span>{evo}</span>
                                            </div>
                                            {index < variant.evolution_chain.length - 1 && <FaArrowRight className={styles.evolutionArrow}/>}
                                        </React.Fragment>
                                    ))
                                    }
                                </div>
                            </div>

                            {/* Moveset Display */}
                            <MovesetDisplay variant={variant} />
                        </div>
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
}

export default PokemonDisplay;