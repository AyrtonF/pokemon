import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/http-poke-api.service';
import { PokemonDataService } from '../services/pokemon-data-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  pokemon: any;
  resultadoBatalha: string = '';
  resultadoCor: string = '';

  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private pokemonDataService: PokemonDataService
  ) {}


  ngOnInit() {
    this.pokemon = this.pokemonDataService.currentPokemon;
    if (!this.pokemon) {
      this.buscarPokemonAleatorio();
    } else {
      this.sistemaDeBatalha();
    }
  }

  adicionarFotoNaGaleria() {
    this.photoService.adicionarNovaFoto();
  }

  buscarPokemonAleatorio() {
    this.pokeAPIService.getRandomPokemon().subscribe((data) => {
      this.pokemon = data;
      this.sistemaDeBatalha();
    });
  }

  sistemaDeBatalha() {
    const capturedPokemons = this.pokemonDataService.getCapturedPokemons();
const capturedPokemon = capturedPokemons[capturedPokemons.length - 1];

    if (!capturedPokemon) {
      this.resultadoBatalha = 'Nenhum Pokémon para comparar.';
      this.resultadoCor = 'gray';
      return;
    }

    const habilidadesTab1 = capturedPokemon.abilities.length || 0;
    const habilidadesTab2 = this.pokemon.abilities.length;

    if (habilidadesTab2 === habilidadesTab1) {
      this.resultadoBatalha = 'Empate';
      this.pokemonDataService.updatePokemonStatus(capturedPokemon.name, 'Empate');
      this.resultadoCor = 'warning';
    } else if (habilidadesTab2 > habilidadesTab1) {
      this.resultadoBatalha = 'Ganhou';
      this.pokemonDataService.updatePokemonStatus(capturedPokemon.name, 'Perdeu');
      this.resultadoCor = 'danger';
    } else {
      this.resultadoBatalha = 'Perdeu';
      this.pokemonDataService.updatePokemonStatus(capturedPokemon.name, 'Ganhou');
      this.resultadoCor = 'success';
    }
  }
}
