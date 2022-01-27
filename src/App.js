
import './App.css';
import {useEffect, useState } from "react";
import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function App() {

  //busqueda
  

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [busqueda, setBusqueda]= useState("");

  const [pokemon, setPokemon] = useState({});
  const [buttonmod, setButtonmod] = useState(true);
  const [currentPokemonId, setCurrentPokemonId] = useState(1);
  const lis =() =>{
    setButtonmod(false)
}

  const fetchPokemon=(id)=>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response)=>response.json())
    .then((data)=>setPokemon(data))
    ; lis();

  };

  const onChange = async e=>{

    e.persist();

    setBusqueda(e.target.value);

  }

  const fetchPokemonbyname = () => {

    fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}`)

      .then((response) => response.json())

      .then((data) => setPokemon(data))

      ;

  };
  const getRandomInt=(min= 1,max=600)=>{
    return Math.floor(Math.random()* (max-min)+min);

  }

  const getNext=(min=1,max=600)=>{
    if ((pokemon.id === isNaN) ||  (pokemon.id === undefined )){
      return pokemon.id = 0;
      
    }
    if(pokemon.id >= max){
      return pokemon.id = min;
    } else{
      return pokemon.id +1;

    }
  }


 const getBack=(min=1, max=600)=>{
if ((pokemon.id === isNaN) ||  (pokemon.id === undefined )){
  return pokemon.id = 600;
  
}
  if(pokemon.id<=min){
  return pokemon.id=max;
}else {
  return pokemon.id - 1 ;

}
};

  


  useEffect(() => {
    console.log({ pokemon });
    pokemon?.abilities?.map((ability) => 
    console.log({name: ability.name}));
  setCurrentPokemonId(pokemon.id);
  }, [pokemon]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>The pokemon </h1>
        <div className="Flex-container">
      
        <img 
        src={pokemon?.sprites?.front_default??
         " http://pngimg.com/uploads/pokeball/pokeball_PNG3.png"
      } 
        className="poke-image" 
        alt="logo" 
        />
         <img 
        src={pokemon?.sprites?.back_default??

        "http://pngimg.com/uploads/pokeball/pokeball_PNG9.png"}
         className="poke-image" 
         alt="logo"
          />
       
        
        </div>
       <a href="https://github.com/karla16Santoyo99/ProyectoPokeDexU1"> Git Hub</a>
        <p>Pokemon Name: {pokemon.name ?? "No pokemon selected"}</p>
      
        <p>Pokemon ID: {currentPokemonId?? "No pokemon slected"}</p>

        <div>
    
      <label class="field field_v1">
      <input class="field__input" value={busqueda} placeholder=" Nombre de Pokemon" onChange={onChange} />
   
    <span class="field__label-wrap">
    
    </span>
  </label>
       
        <div className="flex-container">   
           
        <button className="button"  onClick={() => fetchPokemonbyname()}>Buscar</button>

        <button className="button" onClick={() =>fetchPokemon(getBack())}>Back</button>

        <button className='button'  onClick={()=>fetchPokemon(getRandomInt())}>Random</button>

        <button className="button" onClick={()=>fetchPokemon(getNext())}>Next</button>
        <button className='button' disabled={buttonmod} onClick={openModal}>Abilities</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>Habilidades Pokemon</div>
      

        <ul className='text'>

          {

            pokemon?.abilities?.map((ability) => (

              <li key={ability.ability.id}> {ability.ability.name}  </li>

            ))

          }

          </ul>
        
        <button className='button' onClick={closeModal}>close</button>
        
        
      </Modal>
    </div>

        <div>
          
        </div>
        </div>
        
        
      </header>
    </div>
  );
}

export default App;
