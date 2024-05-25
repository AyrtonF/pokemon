import { Component } from '@angular/core';
import { ViaCEPService } from './../services/http-via-cep.service';
import { PokeAPIService } from './../services/http-poke-api.service';
import { PokemonDataService } from '../services/pokemon-data-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  buscarPokemonArea: string = '';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  };
  pokemon: any;
  showResult: boolean = false;
  captured: boolean = false; // Inicializando a propriedade 'captured'

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private pokemonDataService: PokemonDataService
  ) {}

  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.buscarPokemonArea).subscribe((value) => {
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
      this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value))['bairro'];
      this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
      this.areaBusca.uf = ' - ' + JSON.parse(JSON.stringify(value))['uf'];
    });

    this.pokeAPIService.getRandomPokemon().subscribe((data) => {
      this.pokemon = data;
      this.showResult = true;
      if (this.checkCaptureChance()) {
        this.capturePokemon();
      }
      this.pokemonDataService.changePokemon(data); // Atualiza o serviço com o novo Pokémon
    });
  }

  checkCaptureChance(): boolean {
    return Math.random() < 0.5; // 50% de chance de retorno verdadeiro
  }

  capturePokemon() {
    
    this.captured = true; // Marcando o Pokémon como capturado
    this.pokemonDataService.capturePokemon(this.pokemon);
  }
}
