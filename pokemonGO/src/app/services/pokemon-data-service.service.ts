
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {
  private pokemonSource = new BehaviorSubject<any>(null);
  currentPokemon = this.pokemonSource.asObservable();

  private capturedPokemonsSource = new BehaviorSubject<any[]>([]);
  capturedPokemons = this.capturedPokemonsSource.asObservable();

  constructor() { }

  changePokemon(pokemon: any) {
    this.pokemonSource.next(pokemon);
  }

  capturePokemon(pokemon: any) {
    const capturedPokemons = this.capturedPokemonsSource.getValue();
    
    capturedPokemons.push({ ...pokemon, victories: 0, defeats: 0, draws: 0 });
    this.capturedPokemonsSource.next(capturedPokemons);
  }

  updatePokemonStatus(pokemon: any, status: string) {
    const capturedPokemons = this.capturedPokemonsSource.getValue();
    const index = capturedPokemons.findIndex(p => p.name === pokemon.name);
   
    if (index !== -1) {
      
      switch (status) {
        case 'Ganhou':
          capturedPokemons[index].victories++;
          break;
        case 'Perdeu':
          capturedPokemons[index].defeats++;
          break;
        case 'Empate':
          capturedPokemons[index].draws++;
          break;
        default:
          break;
      }
      this.capturedPokemonsSource.next(capturedPokemons);
    }
  }
}
