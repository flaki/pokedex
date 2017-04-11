// Why //? http/https universal protocol
var POKE_API_URL = '//pokeapi.co/api/v2/pokemon/?limit=50';
var POKE_SPRITE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/###.png';


// Network API request using XMLHttpRequest
function pokeXhr() {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', POKE_API_URL);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if(xhr.status === 200) {
        var poke = JSON.parse(xhr.responseText);
        console.log('XHR result: ', poke);

        renderPokemons(poke.results);
      } else {
        console.log('Error fetching API data, HTTP/'+xhr.status);
      }
    }
  };

  xhr.send();
}


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
      renderPokemons(poke.results);
    }
  ).catch(
    error => console.log('Error fetching API data: ', error)
  )
}


//pokeXhr();
pokeFetch();


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

  ul.innerHTML = '';
  pokemons.forEach(function(li) {
    ul.appendChild(li);
  });
}
