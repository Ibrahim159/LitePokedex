const title = document.querySelector(".pokemon__name");
const profile = document.querySelector(".profile-img");
const pokemon_type = document.querySelector(".pokemon__exp");
const atk = document.querySelector(".atack");
const def = document.querySelector(".defense");
const input_search = document.getElementById("search_name");
const btn_refresh = document.getElementById("btn-refresh");
const btn_search = document.getElementById("btn-search");

const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

const fetchData = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        pokemon = {
            name: data.name,
            img: data.sprites.front_default,
            type: data.types[0].type.name,
            atk: data.stats[1].base_stat,
            def: data.stats[2].base_stat
        }
        drawCard(pokemon);
    } catch (error) {
        
    }
}

const drawCard = (pokemon) => {
    profile.setAttribute('src', pokemon.img);
    title.textContent = pokemon.name;
    pokemon_type.textContent = "Type: " + pokemon.type;
    atk.textContent = pokemon.atk + " ATK";
    def.textContent = pokemon.def + " DEF";
    if(pokemon.name === "yveltal"){
        document.body.style.backgroundColor = "rgb(247,202,170)"
    }else{
        document.body.style.backgroundColor = `rgb(${randomNumber(200,255)}, 
        ${randomNumber(200,255)}, ${randomNumber(0,255)})`;
    }
    input_search.setAttribute('placeholder', pokemon.name);
}

btn_refresh.addEventListener('click', ()=>{
    input_search.classList.remove('error');
    fetchData(randomNumber(0,899));
});

btn_search.addEventListener('click', () => {
    if(input_search.value === "" || input_search.value === null){
        input_search.className = "error"
    }else{
        input_search.classList.remove('error');
        fetchData(input_search.value);
        input_search.value = "";
    }
});

document.onload(fetchData(randomNumber(0,899)));
