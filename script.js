// Why //? http/https universal protocol
var POKE_API_URL = '//pokeapi.co/api/v2/pokemon/?limit=20';
var POKE_SPRITE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/###.png';

var pokemonList = [];
var pokemonTypes;
var pokemonSprites = {};


// Network API request using XMLHttpRequest
function pokeFetch() {
  return fetch(
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

// Load pokemon sprites
function pokeSprites() {
  pokemonSprites = {};
  pokemonList.forEach(pokemon => {
    let pokemonId = parseInt( pokemon.url.match(/pokemon\/(\d+)/)[1], 10);
    let imgsrc = POKE_SPRITE_URL.replace('###',pokemonId);

    pokemonSprites[imgsrc] = false;
    img = document.createElement('img');
    img.onload = function() {
      pokemonSprites[imgsrc] = true;

      // Update rendered document
      document.querySelector('img[src="'+imgsrc+'"]').parentNode.classList.add('loaded');
    };

    // Preload sprite
    img.src = imgsrc;
  });
}

// Get pokemon types
function pokeTypes() {
  return fetch('poketypes.min.json').then(r => r.json()).then(result => {
    pokemonTypes = result;

    renderPokemons(pokemonList);
  });
}

// Fetch pokemon list asynchronously
// Then fetch types and add type data async as well
pokeFetch().then(pokeSprites).then(pokeTypes);


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
  let ul = document.querySelector('main > ul');

  // With map & innerHTML
  let pokemons = poke.map(function(pokemon) {
    let li = document.createElement('li');
    let pokemonId = parseInt( pokemon.url.match(/pokemon\/(\d+)/)[1], 10);

    let imgsrc = POKE_SPRITE_URL.replace('###',pokemonId);
    let spriteLoaded = !!pokemonSprites[imgsrc];

    // Capitalization of pokemon.name is done in CSS, instead of in JS
    let content = `
      <img src="${imgsrc}">
      <label>${pokemon.name}</label>
    `;
    if (spriteLoaded) li.className = 'loaded';

    // Type
    if (pokemonTypes && pokemonTypes[pokemon.name]) {
      content += '<span>'+pokemonTypes[pokemon.name].map(
        type => `<i class="${type}"'>${type}</i>`
      ).join('')+'<span>';
    }

    li.innerHTML = content;
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
