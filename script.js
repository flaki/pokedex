var poke = [
{
  "id": 1,
  "name": "Bulbasaur",
  "type": [ "grass", "poison" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
},
{
  "id": 5,
  "name": "Charmeleon",
  "type": [ "fire" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
},
{
  "id": 15,
  "name": "Beedrill",
  "type": [ "bug", "poison" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png"
},
{
  "id": 193,
  "name": "Yanma",
  "type": [ "bug", "flying" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/193.png"
},
{
  "id": 152,
  "name": "Chikorita",
  "type": [ "grass" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png"
},
];


setTimeout(function() {
  console.log(poke);
  renderPokemons(poke);
}, 3000);


function renderPokemons(poke) {
  var ul = document.querySelector('main > ul');

  // With map & innerHTML
  var pokemons = poke.map(function(pokemon) {
    var li = document.createElement('li');
    li.innerHTML = '<img src="'+pokemon.sprite+'"><label>'+pokemon.name+'</label>';
    return li;
  });

  console.log(pokemons);

  ul.innerHTML = '';
  pokemons.forEach(function(li) {
    ul.appendChild(li);
  });
}
