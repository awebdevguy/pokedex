const pokeContainer = document.getElementById('poke-container');
const pokemonCount = 100;
const colors = {
  normal: '#F5F5F5',
  fighting: '#E6E0D4',
  flying: '#F5F5F5',
  poison: '#98d7a5',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  bug: '#f8d5a3',
  ghost: '#f8f8ff',
  steel: '#f0f8ff',
  fire: '#FDDFDF',
  water: '#DEF3FD',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  psychic: '#eaeda1',
  ice: '#f0ffff',
  dragon: '#97b3e6',
  dark: '#708090',
  fairy: '#fceaff',
};

const main_types = Object.keys(colors);
console.log(`maintypes: ${main_types}`);


// async function fetchData() {
//   const url = `https://pokeapi.co/api/v2/pokemon?limit=10`;
//   const res = await fetch(url);
//   const data = await res.json();
//   // console.log('data: ' + data);
//   return data;

  // for (const result of data.results) {
  //   const value = await createPokemonCard(result);
  //   console.log('item: ' + result);
  //   console.log(value);
  // }
  // await getPokemon(data.results);
// }

// async function useData() {
//   const data = await fetchData();
//   console.log(data);
//   for(const item of data.results) {
//     console.log(item);
//   }
// };

// useData();


// function getPokemon(results) {
//     for (const result of results) {
//     createPokemonCard(result);
//     };
// };


const fetchPokemons = async () => {
  for(let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
}

const getPokemon = async (id) => {

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
  console.log('pokemon: ' + pokemon);
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');

  const id = pokemon.id.toString().padStart(3, '0');
  // const id = idx.toString().padStart(3, '0');
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const types = pokemon.types.map(type => {
    console.log(`type: ${type}`);
    console.log(`type.type.name: ${type.type.name}`);
    return type.type.name;
  });

  console.log(`types: ${types}`);

  const type = main_types.find(type => types.indexOf(type) > -1);
  console.log(`type: ${type}`);
  const color = colors[type];
  const pokemonInnerHTML = 
  `
    <div class="img-container">
      <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="">
    </div>
    <div class="info">
      <span class="number">${id}</span>
      <h3 class="name">${name}</h3>
      <small class="type">Type: <span>${type[0].toUpperCase() + type.slice(1)}</span> </small>
    </div>
  `
  pokemonEl.style.backgroundColor = color;
  pokemonEl.innerHTML = pokemonInnerHTML;
  pokeContainer.appendChild(pokemonEl);
}

fetchPokemons();
