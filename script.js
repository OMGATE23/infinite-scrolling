const displayBox = document.querySelector("#display-box");
let pokemonsList = document.querySelectorAll(".pokemons");
const errorDisplay = document.querySelector("#error");
let OFFSET = 0;
const lastElementObserver = new IntersectionObserver(
  (entries) => {
    lastElement = entries[entries.length - 1];
    if (lastElement.isIntersecting) {
      fetchPokemons(OFFSET);
      lastElementObserver.unobserve(lastElement.target);
    }
  },
  {
    threshold: 0.5,
  }
);

const firstElementObserver = new IntersectionObserver(
  (entries) => {
    firstElement = entries[0];
    firstElement.classList.toggle("first-element", firstElement.isIntersecting);
  },
  {
    threshold: 0.5,
  }
);

const outOffViewObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("hide", !entry.isIntersecting);
    });
  },
  {
    threshold: 0.5,
  }
);

fetchPokemons(OFFSET);

function fetchPokemons(offset) {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
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

  pokemonsList = [...pokemonsList, ...pokemonArray];

  pokemonArray.forEach((pokemonElement) => {
    displayBox.append(pokemonElement);
  });
  lastElementObserver.observe(pokemonsList[pokemonsList.length - 1]);
  errorDisplay.textContent = "";
  OFFSET += 10;
}

//
