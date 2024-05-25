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
  pokemonTab1: any;

  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private pokemonDataService: PokemonDataService
  ) {
    this.pokemonDataService.currentPokemon.subscribe(pokemon => this.pokemonTab1 = pokemon);
  }

  ngOnInit() {
    this.buscarPokemonAleatorio();
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
    if (!this.pokemonTab1) {
      this.resultadoBatalha = 'Nenhum Pokémon para comparar.';
      this.resultadoCor = 'gray';
      return;
    }

    const habilidadesTab1 = this.pokemonTab1.abilities.length || 0;
    const habilidadesTab2 = this.pokemon.abilities.length;

    if (habilidadesTab2 === habilidadesTab1) {
      this.resultadoBatalha = 'Empate';
      this.pokemonDataService.updatePokemonStatus(this.pokemon, this.resultadoBatalha)
      this.resultadoCor = 'warning';
    } else if (habilidadesTab2 > habilidadesTab1) {
      this.resultadoBatalha = 'Ganhou';
      this.pokemonDataService.updatePokemonStatus(this.pokemon, this.resultadoBatalha)
      this.resultadoCor = 'success';
    } else {
      this.resultadoBatalha = 'Perdeu';
      this.pokemonDataService.updatePokemonStatus(this.pokemon, this.resultadoBatalha)
      this.resultadoCor = 'danger';
    }
  }
}
