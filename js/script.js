const pokeContainer = document.querySelector(".pokeContainer");
const pokeCount = 1200
const colorsType = {
    grass: '#78c850',
    fire: '#f08030',
    water: '#6890f0',
    electric: '#f8d030',
    poison: '#a040a0',
    flying: '#a890f0',
    normal: '#a8a878',
    fighting: '#c03028',
    ground: '#e0c068',
    rock: '#b8a038',
    bug: '#a8b820',
    ghost: '#705898',
    steel: '#b8b8d0',
    psychic: '#f85888',
    ice: '#98d8d8',
    dragon: '#7038f8',
    dark: '#705848',
    fairy: '#ee99ac',
}

const mainTypes = Object.keys(colorsType);

const fetchPokemons = async () => {
    for (let index = 1; index <= pokeCount; index++) {
        await getPokemons(index)
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemon(data)
}

const createPokemon = (poke) => {
    const card = document.createElement('div');
    card.classList.add("pokemon");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const pokeTypes = poke.types.map(type => type.type.name);
    const type1 = pokeTypes[0];
    const type2 = pokeTypes[1] || null;

    let background;
    if (type2) {
        // If there's a second type, create a linear gradient background
        background = `linear-gradient(to bottom right, ${colorsType[type1]} 49%, ${colorsType[type2]} 50%)`;
    } else {
        // If there's only one type, use its color directly
        background = colorsType[type1];
    }

    card.style.background = background;

    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    };

    const tratamentoName = (name) => {
        const separatorIndex = name.indexOf("-");
        if (separatorIndex !== -1) {
            return name.slice(0, separatorIndex);
        }
        return name;
    };
    const tratamentoDeName = tratamentoName(name);

    const pokemonInnerHTML = `
    <div class="imageContainer">
        <img class="imgPokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${tratamentoDeName}</h3>
        <small class="type">Type: <span>${capitalizeFirstLetter(type1)}</span>${type2 ? ` / <span>${capitalizeFirstLetter(type2)}</span>` : ''}</small>
    </div>
    `;

    card.innerHTML = pokemonInnerHTML;

    pokeContainer.appendChild(card);
}


fetchPokemons();
