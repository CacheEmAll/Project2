import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Pokedex, UserId } from 'src/app/models/pokedex';
import { Observable } from 'rxjs';
import { PokeDataService } from 'src/app/poke-data.service';
import { PokeReviewService } from 'src/app/poke-review.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-writerev',
  templateUrl: './writerev.component.html',
  styleUrls: ['./writerev.component.css']
})
export class WriterevComponent implements OnInit {
  usrID!: String;
  username!: string;
  password!: String;
  email!:String;
  ccname!: String;
  ccnum!: String;
  fname!: String;
  lname!: String;
  phnum!: String;
  phadd!: String;
  uname: string;
  pokeid:number=0;
  herf:string="";
  rating:number;
  disc:string;
  userid:number;
  htmltoadd: string | undefined;
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
public lusername= window.localStorage.getItem("username");
  constructor(private rs:PokeReviewService,private router:Router,private _http : HttpClient) { }
  getUserByUsername(lusername : any):Observable<HttpResponse<User>>{
    return this._http.get("http://localhost:3000/user/username/" +lusername+"/", {observe: "response"}) as Observable<HttpResponse<User>>
    }
  ngOnInit(): void {
   
    // this.getUserId(this.user).subscribe(
    //   (data:any)=>{
    //     this.userid=data.body[0].user_id;
    //     console.log(data.body)
    //     console.log(this.userid)
    //   }
    // )
    let uname = window.localStorage.getItem("username");
      let luser = this.user;
      //this.username = uname;
      this.getUserByUsername(uname).subscribe(
        (data:any) =>{
          this.user = data;
          //let response: String = data.response;
          console.log(this.user)
          this.user = data.body;
          for(let usr of data.body)
          {
            this.username= usr.username;
            this.email=usr.email_address;
            this.fname=usr.first_name;
            this.lname=usr.last_name;
            this.phnum=usr.phone_number;
            this.phadd=usr.physical_address;
            this.ccnum=usr.credit_card_number;
            this.ccname=usr.credit_card_name;
            this.usrID=usr.user_id;
            this.password=usr.password;
          }
        }
        
      );
  }
  submitrev():void{
    this.herf=this.router.url
    var numb=this.herf.replace(/^\D+/g,'');
    var pokenum:number=+numb;
    
    
    this.rs.sendrev(this.rating,this.disc,pokenum,this.user).subscribe(
      (data:any)=>{
        console.log(data)
        this.htmltoadd='<div class="text-center text-muted mt-5 mb-0">Submit successfully</div>'
        setTimeout(() => {
          window.close();
        }, 3000);
        

      },

    )
    
  }
  
  getUserId(user:any):Observable<HttpResponse<UserId>>{
    return this._http.get("http://localhost:3000/user/username/" + user, {observe: "response"}) as Observable<HttpResponse<UserId>>
  }
}
