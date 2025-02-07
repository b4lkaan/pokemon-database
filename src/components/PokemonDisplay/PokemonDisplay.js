// src/components/PokemonDisplay/PokemonDisplay.js
import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import MovesetDisplay from './MovesetDisplay';
import TypeBadge from './TypeBadge';
import StatBar from './StatBar';
import styles from './PokemonDisplay.module.css';
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
            <h1 className={styles.pokemonName}>{pokemon.name}</h1> {/* Use h1 for main title */}
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
                            {/* Section 1: Name, Number, Image, Typing, Abilities */}
                            <section className={styles.infoSection}>
                                {variant.image_url && (
                                    <img src={variant.image_url} alt={variant.name} className={styles.pokemonImage} />
                                )}
                                <div>
                                    <h2 className={styles.variantName}>{variant.name} Variant</h2> {/* Use h2 for variant name */}
                                    <div className={styles.types}>
                                        <h3 className={styles.sectionHeading}>Typing</h3> {/* Use h3 for section headings */}
                                        {variant.typing.map((type) => (
                                            <TypeBadge key={type} type={type} />
                                        ))}
                                    </div>
                                    <div className={styles.abilities}>
                                        <h3 className={styles.sectionHeading}>Abilities</h3>
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
                                </div>
                            </section>

                            {/* Section 2: Movesets */}
                            <section className={styles.movesetSection}>
                                <h3 className={styles.sectionHeading}>Movesets</h3>
                                <MovesetDisplay variant={variant} />
                            </section>

                            {/* Section 3: Base Stats */}
                            <section className={styles.statsSection}>
                                <h3 className={styles.sectionHeading}>Base Stats</h3>
                                {Object.entries(variant.base_stats).map(([statName, statValue]) => (
                                    <StatBar key={statName} statName={statName} statValue={statValue} />
                                ))}
                            </section>

                            {/* Section 4: Evolution Chain */}
                            <section className={styles.evolutionSection}>
                                <h3 className={styles.sectionHeading}>Evolution Chain</h3>
                                <div className={styles.evolutionChain}>
                                    {variant.evolution_chain.map((evo, index) => (
                                        <React.Fragment key={evo}>
                                            <div className={styles.evolutionPokemon}>
                                                <span>{evo}</span>
                                            </div>
                                            {index < variant.evolution_chain.length - 1 && <FaArrowRight className={styles.evolutionArrow} />}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
}

export default PokemonDisplay;