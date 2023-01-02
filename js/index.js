const dvRow = document.querySelector("#divRow");
const url = "https://pokeapi.co/api/v2/pokemon";
const frm = document.querySelector("form");
const pokemonList = [];

(async () => {
  for (let i = 1; i < 21; i++) {
    const response = await fetch(`${url}/${i}`);
    let data = await response.json();
    pokemonList.push(data);
  }
  showPokemons(pokemonList);
})();

frm.inSearch.addEventListener("keyup", (e) => {
  const pokemonName = String(frm.inSearch.value).toLocaleLowerCase();
  if (pokemonName == "") {
    showPokemons(pokemonList);
    return;
  }
  const newSearch = pokemonList.filter((pokemon) => {
    return pokemon.name.startsWith(pokemonName);
  });
  showPokemons(newSearch);
});

function showPokemons(pokemons) {
  dvRow.innerHTML = "";
  if (pokemons.length == 0) {
    const msg = document.createElement("h5");
    msg.innerText = "Pokemon não encontrado...";
    dvRow.appendChild(msg);
  }
  for (const pokemon of pokemons) {
    const dvPokemon = document.createElement("div");
    dvPokemon.className = "col-4";
    dvPokemon.innerHTML = pokemonCard(pokemon);
    dvRow.appendChild(dvPokemon);
  }
}

function pokemonCard(pokemon) {
  const pokeCard = `
  <div class="card" style="width: 18rem; margin-top: 1rem; background-color: ${selectTypeColorBackground(
    pokemon.types[0].type.name
  )};">
  <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${pokemon.name.toUpperCase()}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" style="background-color: ${selectTypeColorAbilities(
      pokemon.types[0].type.name
    )}">${pokemon.abilities[0].ability.name}</li>
    ${
      pokemon.abilities[1]
        ? `<li class="list-group-item" style="background-color: ${selectTypeColorAbilities(
            pokemon.types[0].type.name
          )}">${pokemon.abilities[1].ability.name}</li>`
        : ""
    }
    <li class="list-group-item" style="background-color: ${selectTypeColorAbilities(
      pokemon.types[0].type.name
    )}">${pokemon.types[0].type.name}</li>
  </ul>
</div>
  `;

  return pokeCard;
}

function selectTypeColorBackground(pokemonType) {
  let color = "";
  if (pokemonType == "grass" || pokemonType == "bug") {
    color = "rgb(116, 180, 81)";
  } else if (pokemonType == "fire") {
    color = "rgb(251, 61, 41)";
  } else if (pokemonType == "water") {
    color = "rgb(28, 168, 224)";
  } else if (pokemonType == "normal") {
    color = "rgb(153, 150, 148)";
  }

  return color;
}

function selectTypeColorAbilities(pokemonType) {
  let color = "";
  if (pokemonType == "grass" || pokemonType == "bug") {
    color = "rgb(163, 202, 74)";
  } else if (pokemonType == "fire") {
    color = "rgb(253, 173, 122)";
  } else if (pokemonType == "water") {
    color = "rgb(131, 177, 193)";
  } else if (pokemonType == "normal") {
    color = "rgb(233, 231, 230)";
  }
  return color;
}
