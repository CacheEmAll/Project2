import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { PokeDataService } from 'src/app/poke-data.service';
import { PokeReviewService } from 'src/app/poke-review.service';
import { Pokemon } from 'src/app/pokemon';


const httpOptions   = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Headers': 'Content-type:application/json',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*'
  })
};

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  
  //for wishlist
  userId = String;
  public username = window.localStorage.getItem("username");
  pokemon_id: any = 0;
  //user object
  user = {user_id: String,
    username: String,
    password: String,
    email_address: String,
    credit_card_name :String,
    credit_card_number : String,
    first_name: String,
    last_name: String,
    phone_number: String,
    physical_address: String
};
  Credentials = {withCredentials: true};


  isVisible: boolean = false;
  public name: string = '';
  public pokemon: any = "placeholder";
  rating: any=[];
  constructor(private ps: PokeDataService,private rs:PokeReviewService, private _http : HttpClient) { }
  
  // constructor(private ps: PokeDataService, private _http : HttpClient) { }

  
  ngOnInit(): void {
    console.log(this.username);
    let curr_user = this.user;

    this.getUserByUsername(this.username).subscribe(
      (data:any) => {
        this.user = data;
        console.log(this.user);
        for(let response of data.body){
          this.userId = response.user_id;
        }
        console.log(this.userId)
      }
    )
  }

  getUserByUsername(username : any):Observable<HttpResponse<User>>{
    return this._http.get("http://localhost:3000/user/username/" +username+"/", {observe: "response"}) as Observable<HttpResponse<User>>
    }
    
  //getting pokemon by name in search bar
getPokemon():void{
  this.isVisible = true;
  this.ps.getPokemonFromApi(this.name).subscribe(
  

    //get the data out of the observable that we subscribe to, and put it into a Pokemon object
    (data:any) => {
      let response:String = data.status;//gets the status code
      console.log(response);
      //assign it to our pokemon variable above
      this.pokemon = data.body;
      //we may have to do something with sprites
      console.log(this.pokemon.id) //will be helpful for debugs
    },

    () => { //incase of errors, set pokemon object to null since we didn't get anything back
      this.pokemon = null
      console.log("It got away!!!")
    }
  )

}
addPokemon(pokemon: Pokemon){
  console.log(pokemon);
  this.ps.pokemonList.push(pokemon);
  let price: number = ((pokemon.id * .01) * 543);
  this.ps.totalCost += price; 
  console.log(this.ps.totalCost)
  console.log(typeof this.ps.totalCost)
}
// reviews(id:number){
  
//   this.rs.getAllReviewByPokemonId(id).subscribe(
//     (data:any) => {
//       console.log(data.body)
//       this.rs.reviewsarray=data.body;
//       this.rating=data.body.rating;
//       console.log(this.rating)
//       //this.rating=data.body.rating;
//      // console.log(data.body)
//      // console.log(this.rs.reviewsarray)
//       //this.rp.getreviews(id);
//     }
//   )
// }
reviews(id:number){
  this.rs.pokeid=id;
  this.rs.getAllReviewByPokemonId(id).subscribe(
    (data:any) => {
      console.log(data.body)
      this.rs.reviewsarray=data.body;
      this.rs.pokeid=id;
      this.rating=data.body.rating;
      console.log(this.rating)
      
      //this.rating=data.body.rating;
     // console.log(data.body)
     // console.log(this.rs.reviewsarray)
      //this.rp.getreviews(id);
    }
  )
}

addToWishList(pokemon: Pokemon){
  console.log(pokemon.id);
  let user = {
    user_id: this.userId,
    username: this.username
  }
  let wishlist = {
    pokemon_id: pokemon.id,
    user: user
  }
  console.log(user);
  let Credentials = {withCredentials: true};
  let response = this._http.post<any>("http://localhost:3000/wishlist", wishlist, httpOptions).subscribe(
    {
      next: (v) => console.log("Done"),
      error: (e) => console.log("oops"),
      complete: () => console.log("Complete")
    }
  );
  console.log(response);
}

}