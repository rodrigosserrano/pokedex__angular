import { Component, Input } from '@angular/core';
import { Pokemon } from '../../_model/Pokemon';
import { getPokemonNumber, getPokemonImage } from '../../_model/Pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.sass']
})

export class PokemonCardComponent {
  @Input()
  public pokemon: Pokemon;

  getPokemonNumber  = getPokemonNumber;
  getPokemonImage   = getPokemonImage
}


