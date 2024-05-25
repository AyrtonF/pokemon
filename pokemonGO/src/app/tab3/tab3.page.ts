import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../services/pokemon-data-service.service';
import { Tab2Page } from '../tab2/tab2.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  capturedPokemons: any[] = [];

  constructor(private pokemonDataService: PokemonDataService) {}

  ngOnInit() {
    this.pokemonDataService.capturedPokemons.subscribe(pokemons => {
      this.capturedPokemons = pokemons;
    });
  }
  
  

  getBadgeColor(value: number): string {
    if (value > 0) {
      return 'success'; // verde
    } else if (value < 0) {
      return 'danger'; // vermelho
    } else {
      return 'warning'; // amarelo
    }
  }
}
