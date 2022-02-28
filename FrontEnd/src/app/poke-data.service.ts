// import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, forkJoin, BehaviorSubject, concat } from 'rxjs';
import { catchError } from 'rxjs';

import { Pokemon } from './pokemon';
import { PokemonDetails } from './pokemon';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

//new
import { Inject, Injectable } from '@angular/core';
import { map, switchMap, tap, concatMap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})

export class PokeDataService{

  totalCost : number = 0;
  
  pokemonList: any = [];

  bundleList: any = [];

  wishList: any = [];

  counter: number = 0;
  
  public messageSource = new BehaviorSubject('default string')

  currentMessage = this.messageSource.asObservable();
  pokemon: any;

  changeMessage(newMessage: string){
    this.messageSource.next(newMessage);
  }







  //-------HTTP CALLS BELOW-----
  constructor(private http:HttpClient) {}

  //search for one specific pokemon with the name
  getPokemonFromApi(name:string):Observable<HttpResponse<Pokemon>>{
    return this.http.get("https://pokeapi.co/api/v2/pokemon/" + name + "/", {observe: "response"})as Observable<HttpResponse<Pokemon>>
  }
  getPokemonFromApi2(name:number):Observable<Pokemon>{
    return this.http.get("https://pokeapi.co/api/v2/pokemon/" + name)as Observable<Pokemon>
  }

  //for my history
  getPokemonById(id:string):Observable<HttpResponse<Pokemon>>{
    return this.http.get("https://pokeapi.co/api/v2/pokemon/" + id + "/", {observe: "response"})as Observable<HttpResponse<Pokemon>>
  }

  getAllPokemons() {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    
  }

  getDetails(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
  //   getAllPokemons(): Observable<Array<any>> { //any or unknown?
  //   return this.http.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/").pipe (
  //     map((x) => x.results),
  //     switchMap(x => forkJoin(this.nameUrl(x))),
  //     map(x => x.map(x => {
  //       return {id:x.id, name:x.name, sprites:x.sprites, types:x.types}
  //     })),
  //     tap((x) => console.log(x))
  //   );
  // }

  // nameUrl(arr: Pokemon[]): Observable<Pokemon>[] {
  //   const res = <any>[];
  //   arr.forEach((x: Pokemon) => {
  //     res.push(this.http.get(`https://pokeapi.co/api/v2/pokemon/${x.name}`));
  //   });
  //   return res;
  // }

}
  // sendPokemonToApi(pokemon: Pokemon):Observable<Pokemon>{
  //   let p:Observable<Pokemon> = this.http.post("localhost:4200/cart", pokemon) as Observable<Pokemon>
    
  //   return p;
  // }

  // getAllPokemons(): Observable<any>{
  //   return this.http
  //   .get<Pokemon[]>("https://pokeapi.co/api/v2/pokemon/", httpOptions)
  //   .pipe(
  //     concatMap(pokemons => {
  //       const listPokemons = pokemons.results.map(pokemon => {
  //         return this.getPokemonFromApi(pokemon.name);
  //       });
  //       return forkJoin(listPokemons);
  //     }),
  //     tap(())
  //   )
  // }
  






  // // pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
  // // private handleError: HandleError;
  // display = new BehaviorSubject<boolean>(false)
  // constructor(
  //   private http: HttpClient,
  //   @Inject('pokemonListApi') private pokemonListApi: string,


//   getPokemons(): Observable <any> { //any or unknown?
//     return this.http.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/").pipe (
//       map((x) => x.results),
//       switchMap(x => forkJoin(this.nameUrl(x))),
//       map(x => x.map(x => {
//         return {name:x.name, sprites:x.sprites} as Observable<Pokemon>
//       })),
//       tap((x) => console.log(x))
//     );
//   }

//   nameUrl(arr: Pokemon[]): Observable<Pokemon>[] {
//     const res = <any>[];
//     arr.forEach((x: Pokemon) => {
//       res.push(this.http.get(`https://pokeapi.co/api/v2/pokemon/${x.name}`));
//     });
//     return res;
//   }
// }


//NOTES
//Services allows you to reuse the logic or functionality into different parts of application
//also for organizing code
//APIs should be in the services so that reduce writing the same code again and again | reduce redundancy 