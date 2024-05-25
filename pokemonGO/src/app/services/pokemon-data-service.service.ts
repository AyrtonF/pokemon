import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  constructor() {
   
  }
  
  private capturedPokemons: any[] = [];
  currentPokemon: any;

  getCapturedPokemons() {
    return this.capturedPokemons;
  }

  changePokemon(pokemon: any) {
    this.currentPokemon = pokemon;
  }
  capturePokemon(pokemon: any) {
    this.capturedPokemons.push({
      ...pokemon,
      victories: 0,
      defeats: 0,
      draws: 0
    });
  }

  updatePokemonStatus(pokemonName: string, result: string) {
    const pokemon = this.capturedPokemons.find(p => p.name === pokemonName);
    if (pokemon) {
      if (result === 'Ganhou') {
        pokemon.victories += 1;
      } else if (result === 'Perdeu') {
        pokemon.defeats += 1;
      } else if (result === 'Empate') {
        pokemon.draws += 1;
      }
    }
  }
}
