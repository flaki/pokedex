// Why //? http/https universal protocol
var POKE_API_URL = '//pokeapi.co/api/v2/pokemon/?limit=100';
var POKE_SPRITE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/###.png';

var pokemonList = [];


// Network API request using XMLHttpRequest
function pokeFetch() {
  fetch(
    POKE_API_URL

  // = .then(function(result) { return result.json() })
  ).then(
    r => r.json()

  ).then(
    poke => {
      console.log('Fetch result: ', poke);

      // same as:
      // pokemonList = poke.results;
      // renderPokemons(poke.results);
      renderPokemons(pokemonList = poke.results);
    }
  ).catch(
    error => console.log('Error fetching API data: ', error)
  )
}


// Fetch pokemon list asynchronously
pokeFetch();


// Check for search box
var searchBox = document.querySelector('#filter-pokemons');

// Set up event listener
if (searchBox) {
  // 'change' event only fires when focus leaves the input area
  // searchBox.addEventListener('change', filterPokemons);
  // 'input' event fires on every input
  searchBox.addEventListener('input', filterPokemons);
}


function filterPokemons(event) {
  // Current filter value
  var filter = searchBox.value;

  var filterRegex;
  // Case insensitive search
  filterRegex= new RegExp(searchBox.value, 'i');
  // Limit matches to the start of the pokemon's name
  //filterRegex = new RegExp('^'+searchBox.value, 'i');

  // Filtered pokemon list
  var filtered = pokemonList.filter(
    // Filter only includes elements that return a truthy value for the callback
    // match returns null when no match is found, !!match(..) is thus false
    pokemon => !!pokemon.name.match(filterRegex)
  );
  console.log(filter+' matched '+filtered.length+' pokemons (of '+pokemonList.length+')');

  renderPokemons(filtered);
}


function renderPokemons(poke) {
  var ul = document.querySelector('main > ul');

  // With map & innerHTML
  var pokemons = poke.map(function(pokemon) {
    var li = document.createElement('li');
    var pokemonId = parseInt( pokemon.url.match(/pokemon\/(\d+)/)[1], 10);

    // Capitalization of pokemon.name is done in CSS, instead of in JS
    li.innerHTML = '<img src="'+POKE_SPRITE_URL.replace('###',pokemonId)+'"><label>'+pokemon.name+'</label>';
    return li;
  });

  console.log(pokemons);

  // If 'pokemons' is empty...
  if (!pokemons.length) {
    var emptylist = document.createElement('li');
    emptylist.innerHTML = '<em>No Pokemons found</em>';

    pokemons.push(emptylist);
  }

  ul.innerHTML = '';
  pokemons.forEach(function(li) {
    ul.appendChild(li);
  });
}
