import { makeAutoObservable } from "mobx";

class Store {
    data = [];

    constructor() {
        makeAutoObservable(this);
    }

    fetchData = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
            const responseData = await response.json();
            const pokemonList = await Promise.all(responseData.results.map(async (pokemon) => {
                const pokemonResponse = await fetch(pokemon.url);
                return await pokemonResponse.json();
            }));
            this.setData(pokemonList);
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
        }
    };

    setData(data) {
        this.data = data;
    }

    clearData = () => {
        this.data = [];
    };

    removePokemon = (id: number)  => {
        this.data = this.data.filter(pokemon => pokemon.id !== id);
    }
}

const pokemonStore = new Store();

export default pokemonStore;
