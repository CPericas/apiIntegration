document.addEventListener('DOMContentLoaded', function () {
    fetchAbilities();
})

function fetchAbilities() {
    const apiURL = "https://pokeapi.co/api/v2/ability/";
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const abilities = data.results;
            displayAbilities(abilities);
        })
        .catch(error => console.error('Error getting abilities:', error));       
}

function displayAbilities(abilities) {
    const abilityContainer = document.getElementById('abilityContainer');
    abilityContainer.innerHTML = '';

    abilities.forEach(ability => {
        const abilityItem = document.createElement('li');
        abilityItem.textContent = ability.name.charAt(0).toUpperCase() + ability.name.slice(1);
        abilityItem.addEventListener('click', () => fetchAbilityDetails(ability.url));
        abilityContainer.appendChild(abilityItem);
    });
}

function fetchAbilityDetails(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayAbilityDetails(data);
        })
        .catch(error => console.error('Error fetching ability details:', error));
}

function displayAbilityDetails(data) {
    document.getElementById('abilitiesList').classList.add('hidden');
    document.getElementById('abilityDetails').classList.remove('hidden');

    const AbilityName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    document.getElementById('abilityName').textContent = AbilityName;

    const description = data.effect_entries.find(entry => entry.language.name === 'en').effect;
    document.getElementById('abilityDescription').textContent = description;

    document.getElementById('backButton').addEventListener('click', () => {
        document.getElementById('abilitiesList').classList.remove('hidden');
        document.getElementById('abilityDetails').classList.add('hidden');
    })
}