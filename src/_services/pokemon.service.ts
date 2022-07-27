import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {from, map, mergeMap, ReplaySubject} from "rxjs";
import {Pokemon} from "../_model/Pokemon";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  /*
  Toda vez que tenta pegar uma informação do ReplaySubject,
   é retornado a última informação já existente
   */
  // public pokemons = new ReplaySubject<Pokemon[]>(1);

  public pokemons: Pokemon[] = [];

  constructor(private httpClient: HttpClient) {
    // this.requestPokedex()
    this.requestNestJs()
  }

  private requestNestJs(){
    const apiUrl = 'http://localhost:3000/pokemon/';

    this.httpClient.get<any>(apiUrl).subscribe((res:any) => {
      res.map((r:any) => {
        this.pokemons[r.id] = {
          images: r.images[0].url,
          number: r.id,
          name: r.name,
          types: r.types.map((t: any) => t.type.name),
        };
      });
    });
  }

  /*
  private requestPokedex(){
    const allPokemonsUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=100';

    /******************************
    //A primeira request trás o {algo..., result: { {name: 'xx', url: 'xxx'}, {name: 'xx', url: 'xxx'} }
    this.httpClient.get<any>(allPokemonsUrl).pipe(
      //Aqui é percorrido a request para pegarmos o result dela que é o que importa
      map(value => value.results.map( //Aqui percorremos o resultado para pegar a url, pois irá retornar {name: 'xx', url: 'xxx'}
          pokemon => this.httpClient.get(pokemon.url) //aqui é feita uma nova requisição apenas com a url pega de cada request anterior
          )
        ),
      ).subscribe(this.pokemons);
     *******************************/
    /*
    this.httpClient.get<any>(allPokemonsUrl).pipe(
      map(value => value.results),
      map((value: any) => {
        return from(value).pipe(
          mergeMap((v: any) => this.httpClient.get(v.url))
        )
      }),
      mergeMap(value => value),
    ).subscribe((result: any) => {
      console.log(result);
      this.pokemons[result.id] = {
        image: result.sprites.front_default,
        number: result.id,
        name: result.name,
        types: result.types.map((t: any) => t.type.name),
      };
    })
  }
  */
}
