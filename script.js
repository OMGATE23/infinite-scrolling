const displayBox = document.querySelector("#display-box");
const errorDisplay = document.querySelector("#error");
let OFFSET = 0;
const lastElementObserver = new IntersectionObserver(
  (entries) => {
    let [lastElement] = entries;
    if (lastElement.isIntersecting) {
      fetchPokemons();
      lastElementObserver.unobserve(lastElement.target);
    }
  },
  {
    threshold: 0.5,
  }
);

fetchPokemons();

function fetchPokemons() {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${OFFSET}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
      renderPokemonsList(data.results);
    })
    .catch((err) => {
      errorDisplay.textContent = err.message;
    });
}

function renderPokemonsList(results) {
  let pokemonArray = results.map((pokemon) => {
    let li = document.createElement("li");
    li.textContent = pokemon.name;
    return li;
  });
  pokemonArray.forEach((pokemonElement) => {
    displayBox.append(pokemonElement);
  });
  lastElementObserver.observe(pokemonArray[pokemonArray.length - 1]);
  errorDisplay.textContent = "";
  OFFSET += 10;
}
