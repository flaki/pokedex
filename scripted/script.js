var poke = [
{
  "id": 1,
  "name": "Bulbasaur",
  "type": [ "grass", "posion" ],
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
  "type": [ "bug", "posion" ],
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

console.log(poke);

var ul = document.querySelector('main > ul');


// with document.createElement
ul.innerHTML = '';
poke.forEach(function(pokemon) {
  var li = document.createElement('li');
  var img = document.createElement('img');
  var label = document.createElement('label')

  img.src = pokemon.sprite;

  // var text = document.createTextNode()
  // text.textContent = pokemon.name;
  // label.appendChild(text);
  label.textContent = pokemon.name;

  li.appendChild(img);
  li.appendChild(label);
  ul.appendChild(li);
})



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



// With ES6 Template Literals
var newul = document.createElement('ul');
newul.innerHTML =
  poke.map(pokemon => `<li>
                        <img src="${pokemon.sprite}">
                        <label>${pokemon.name}</label>
                      </li>`
  ).join('\n');

ul.parentNode.replaceChild(newul, ul);
