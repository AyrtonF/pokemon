import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokeAPIService {
  constructor(private httpClient: HttpClient) {}

  getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1; // Gera um ID aleatório entre 1 e 898
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  }
}
