import { useState } from 'react'
import Axios from "axios";
import './App.css'

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    number: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  });


  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((res) => {
      setPokemon({
        name:pokemonName,
        number: res.data.id,
        species: res.data.species.name,
        image: res.data.sprites.front_default,
        hp: res.data.stats[0].base_stat,
        attack: res.data.stats[1].base_stat,
        defense: res.data.stats[2].base_stat,
        speed: res.data.stats[5].base_stat,
        type: res.data.types[0].type.name
      })
      setPokemonChosen(true);
    });
  };

  return (
    <div className="App">
      <div className='TitleSection'>
        <h1>Pokédex</h1>
        <input 
        type="text"
        onChange={(ev) => {
          setPokemonName(ev.target.value);
        }}
        value={pokemonName.toLowerCase()}
        />
        <button onClick={searchPokemon}>Search Pokémon</button>
      </div>
      <div className='DisplaySection'>
        {!pokemonChosen ? (
          <h1>Please choose a Pokémon</h1>
        ) : (
        <div className='carta'>
          <h1 className='atributo'>{pokemon.name.toUpperCase()}</h1>
          <img className='atributo' src={pokemon.image} alt={pokemon.name}/>
          <h3 className='atributo'>Number: #{pokemon.number}</h3>
          <h3 className='atributo'>Type: {pokemon.type.toUpperCase()}</h3>
          <h4 className='atributo'>Hp: {pokemon.hp}</h4>
          <h4 className='atributo'>Attack: {pokemon.attack}</h4>
          <h4 className='atributo'>Defense: {pokemon.defense}</h4>
          <h4 className='atributo'>Speed: {pokemon.speed}</h4>
        </div>
        )}
      </div>
    </div>
  )
}

export default App
