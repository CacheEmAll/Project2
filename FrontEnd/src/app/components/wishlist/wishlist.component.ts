import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Pokedex, UserId, Wishlist } from 'src/app/models/pokedex';
import { Observable, window } from 'rxjs';
import { PokeDataService } from 'src/app/poke-data.service';
import { LoginComponent } from '../login/login.component';
//import { LocalStorage } from '@ngx-pwa/local-storage';


const httpOptions   = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Headers': 'Content-type:application/json',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*'
  })
};
 interface Pokemon {
  // id: number;
  results: [],
  id: number,
  name:string,
  url: string,
  types: Object,
  sprites: [],
  front_shiny:string
  //wishListId:number
  
}
class User1 {
  
    public user_id:number;
  public username: String;
  public password: String;
  public email_address: String;
  public credit_card_name :String;
  public credit_card_number : String;
  public first_name: String;
  public Last_name: String;
  public Phone_number: String;
  public Physical_address: String
  
}
class WishlistAndPokemon{
 // id:number;
 public wishlistId:number;
 public  pokemon:any;//Pokemon;

 
}
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist: any = [];
  mylist: any = [];
  //localStorage: LocalStorage;
   username= localStorage.getItem("username") ;
    //user=localStorage.getItem("user") ;
  userId: User1;
 user :number;
  pokemonId: string;
  userInfo: any = [];
  pokemon_id: any = [];
  public pid: string = '';
  //pokemon with wishlist id
  pokemonWithWishlistArray: Array<WishlistAndPokemon>=[];
  wishpok=new  WishlistAndPokemon();
  
  pokemonArray: any = [];
  pokemonArray2: any = [];
  //public lusername= window.localStorage.getItem("username");
  response : any ;
  msgError ="";
  Credentials = {withCredentials: true};
  id: string;
  
  constructor(private _http : HttpClient, private ps: PokeDataService
    ) {}



  removeWishlist(pokemonid:number)
  {
    this.wishlist.pop();
    let response=this._http.delete("http://localhost:3000/delete/"+ pokemonid )
    .subscribe( (data: any)=>{console.log(data);});
  
  }
  ngOnInit(): void {
    console.log(this.username);
     
    this.getUserId(this.username).subscribe(
      (data:any) =>{
        this.userId= data[0];
        this.id=JSON.stringify(this.userId.user_id);
        console.log("this id "+this.id);
     // })
       /* let x = this.user.first_name;
        for (let x of this.user){
        this.userId = x.user_id;
        console.log(this.userId)});*/
  //if(this.id)
 // {
     let response=this._http.get("http://localhost:3000/wishlist/user/"+  this.id)
    .subscribe(
       (data: any)=>{
      for(let wishlst of data)
      {
        console.log("wishlist id  "+wishlst.pokemon_id);
        //get pokemon
       let pokmn= this.ps.getPokemonFromApi2(wishlst.pokemon_id).subscribe( (data1)=>{
       console.log("data pokemon json " + ( data1));
       //create model that has wishlist id and the pokemon
       this.wishpok.pokemon=data1;
       this.wishpok.wishlistId=wishlst.wishlist_id;
        //in html we are going to use this list
       this.pokemonWithWishlistArray.push(this.wishpok); })
      
      }
    })
      
 });
      
     
    
  }
  saveWishlist()
  {
    // console.log("user " + this.user +" user name " +this.username);
    //let username = JSON.parse(window.arguments);
       //hard coded username as abc which exists in dba
       //mylist is array of ints represnts pokemon ids               
      let response=this._http.post("http://localhost:3000/wishlist/"+this.username ,this.mylist)
      .subscribe( (data)=>{console.log(data);});

  }
  getWishlistByUserId(userId: any):Observable<HttpResponse<Pokedex>>{
    return this._http.get("http://localhost:3000/wishlist/user/" + userId,
     {observe: "response"}) as Observable<HttpResponse<Wishlist>>
  }

  getUserId(user:any):Observable<User1>{
    console.log("the user is "+user)
    return this._http.get("http://localhost:3000/user/username/" + user) as Observable<User1>
  }
}
function arr(arg0: string, arr: any) {
  throw new Error('Function not implemented.');
}

