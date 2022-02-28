import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

//firebase
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';

const httpOptions   = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Headers': 'Content-type:application/json',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*'
  })
};


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  username!: string;
  password!:String;
  result!: boolean;
  user = {username: String, password: String};
  Credentials = {withCredentials: true};
  response : any ;
  //msgError="Invalid Credentials, Please Enter a Valid User Name And/or Password";
  msgError ="";
  constructor(private _http : HttpClient, private router : Router,  public auth: AngularFireAuthModule) {

   }


  ngOnInit(): void{
    //window.localStorage.clear();
   // this.response=this._http.post("localhost:3000/login",this.user, this.Credentials );
  }

  Loginusr(){
    let user = {username: this.username,
                password: this.password};

    let Credentials = {withCredentials: true};
    this.auth = new firebase.auth.GoogleAuthProvider();
    console.log(this.auth);
    console.log(this.username);
    console.log(this.password);
    console.log(user);
    console.log(Credentials);

    //window.localStorage.setItem("username",this.username);
    let response = this._http.post<any>("http://localhost:3000/login", user, httpOptions ).subscribe (
      {
      next: (v) => this.router.navigate(['/frontpage']),  //console.log("reponse rcieved"),
      error: (e) => console.error(  this.msgError= " Invalid Credentials, Please Enter a Valid User Name And/or Password"),
      complete: () => window.localStorage.setItem("username",this.username)//console.info('Complete')
    }
    );
  };

  //Create logout function to end session in another component

}
