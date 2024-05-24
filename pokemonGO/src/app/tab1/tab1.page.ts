import { ViaCEPService } from './../services/http-via-cep.service';
import { PokeAPIService } from './../services/http-poke-api.service';
import { Component } from '@angular/core';
import { json } from 'express';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
buscarPokemonArea:string = ''
areaBusca:any={

bairro: '',
localidade:'',
logradouro:'',
uf:''

};
  constructor(private pokeAPIService:PokeAPIService, private viaCEPService:ViaCEPService) {}

buscarPokemon(){
  this.viaCEPService.getViaCEPService(this.buscarPokemonArea).subscribe((value)=>{

this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro']
this.areaBusca.bairro =', '+ JSON.parse(JSON.stringify(value))['bairro']
this.areaBusca.localidade =' - '+ JSON.parse(JSON.stringify(value))['localidade']
this.areaBusca.uf = ' - '+JSON.parse(JSON.stringify(value))['uf']

  })
  this.pokeAPIService.getPokeAPIService();
}

}
