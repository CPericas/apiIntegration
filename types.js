document.addEventListener('DOMContentLoaded', function () {
    fetchTypes();
})

function fetchTypes() {
    const apiURL = "https://pokeapi.co/api/v2/type/";
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const typesList = document.getElementById('typesList');
            data.results.forEach(type => {
                const typeButton = document.createElement('button');
                typeButton.classList.add('btn', 'btn-outline-primary', 'm-2');
                typeButton.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
                typeButton.addEventListener('click', () => fetchPokemonByType(type.name));
                typesList.appendChild(typeButton);
            });
        })
}

function fetchPokemonByType(type) {
    const apiURL = `https://pokeapi.co/api/v2/type/${type}`;
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const pokemonList = data.pokemon;
            const pokemonsContainer = document.getElementById('pokemons');
            pokemonsContainer.innerHTML = '';

            pokemonList.forEach(pokemon => {
                const pokemonCard = document.createElement('div');
                pokemonCard.classList.add('col-md-3', 'pokemon-card');

                fetch(pokemon.pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        const pokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
                        const pokemonImage = pokemonData.sprites.front_default;

                        pokemonCard.innerHTML = `
                            <div class="card">
                                <img src="${pokemonImage}" class="card-img-top" alt="${pokemonName}">
                                <div class="card-body">
                                    <h5 class="card-title">${pokemonName}</h5>
                                </div>
                            </div>
                        `;
                    
                        pokemonsContainer.appendChild(pokemonCard);

                    })
            })
            document.getElementById('pokemonList').classList.remove('hidden');
        })
        .catch(error => console.error('Error getting Pokemon for this type', error));
}