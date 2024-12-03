// I conbined the search and Pokemon Details pages into one page.

document.getElementById('searchBtn').addEventListener('click', fetchPokemon);

function fetchPokemon() {
    const userInput = document.getElementById('pokemonInput').value.toLowerCase().trim();
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${userInput}`;

    document.getElementById('errorMessage').classList.add('hidden');
    document.getElementById('pokemonInput').classList.remove('hidden');

    fetch(apiURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Pokemon not found');
            }
            return response.json();
        })
        .then((data) => {
            displayPokemonData(data);
        })
        .catch((error) => {
            document.getElementById('errorMessage').classList.remove('hidden');            
        })
}

function displayPokemonData(data) {
    document.getElementById('pokemonName').textContent = data.name.toUpperCase();
    document.getElementById('pokemonID').textContent = data.id;
    document.getElementById('pokemonImage').src = data.sprites.front_default;

    const types = data.types.map((typeInfo) => typeInfo.type.name).join(', ');
    document.getElementById('pokemonType').textContent = types;

    const abilities = data.abilities.map((abilityInfo) => abilityInfo.ability.name).join(', ');
    document.getElementById('pokemonAbilities').textContent = abilities;

    const statsContainer = document.getElementById('pokemonStats');
    statsContainer.innerHTML = '';
    data.stats.forEach((statInfo) => {
        const statName = statInfo.stat.name;
        const statValue = statInfo.base_stat;

        const statItem = document.createElement('li');
        statItem.textContent = `${statName.toUpperCase()}: ${statValue}`;
        statsContainer.appendChild(statItem);
    })

    document.getElementById('pokemonInfo').classList.remove('hidden');
}