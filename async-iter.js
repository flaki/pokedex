function fetchStuff() {
  var stuff = [];

  for (var i = 0; i < 3; i++) {
    fetch('https://pokeapi.co/api/v2/type/'+(i+1)).then(r => r.json()).then(result => {
      console.log('i = ', i);
      stuff[i] = result;
      // alternatively:
      // stuff.push(result);
      // would fix the issue, but would not respect our inbound order
    });
  }

  return stuff;
}

// Fixed with ES6's for..of fresh-bindings-on-iteration
function fetchStuffForFreshBinding() {
  var stuff = [];

  for (let i = 0; i < 3; i++) {
    fetch('https://pokeapi.co/api/v2/type/'+(i+1)).then(r => r.json()).then(result => {
      console.log('i = ', i);
      stuff[i] = result;
    });
  }

  return stuff;
}

// Synchronized promises with Promise.all
function fetchStuffPromiseAll() {
  var stuff = [];

  var promises;
  // same as:
  // promises = [
  //   fetch('https://pokeapi.co/api/v2/type/1').then(r => r.json()),
  //   fetch('https://pokeapi.co/api/v2/type/2').then(r => r.json()),
  //   fetch('https://pokeapi.co/api/v2/type/3').then(r => r.json())
  // ];

  promises = [1,2,3].map(
    i => fetch('https://pokeapi.co/api/v2/type/'+(i+1)).then(r => r.json())
  );

  Promise.all(promises).then(results => {
    results.forEach( (result, i) => {
      console.log('i = ', i);
      stuff[i] = result;
    });
  });

  return stuff;
}

// Fixed with Function.prototype.bind
function fetchStuffBind() {
  var stuff = [];

  for (var i = 0; i < 3; i++) {
    fetch('https://pokeapi.co/api/v2/type/'+(i+1)).then(r => r.json()).then(
      (function (i, result) {
        console.log('i = ', i);
        stuff[i] = result;
      }).bind(null, i)
    );
  }

  return stuff;
}





var stuff;

// Fetch stuff
//stuff = fetchStuff();
//stuff = fetchStuffForFreshBinding();
//stuff = fetchStuffPromiseAll();
stuff = fetchStuffBind();

// Periodically display "stuff"'s content
var iv = setInterval(function() {
  console.log(stuff);
}, 1000);

// Stop showing stuff's content after 5s
setTimeout(function() { clearInterval(iv); }, 10000);
