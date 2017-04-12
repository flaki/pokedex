Promise.all(
  fetchAllTypes()
).then( results => {
  let types = {};

  results.forEach(result => {
    let ct = result.name;

    result.pokemon.forEach(poke => {
      types[poke.pokemon.name] = types[poke.pokemon.name]||[];
      types[poke.pokemon.name][poke.slot-1] = result.name;
    });
  })

  console.log(window.types = types);
})


function fetchAllTypes() {
  return arrayOfOneTo(18).map(i =>
    fetch(`http://pokeapi.co/api/v2/type/${i}/`).then( r => r.json() )
  )
}


function arrayOfOneTo(end) {
  return Array(end+1).fill(0).map((i,key)=>key).slice(1)
}
