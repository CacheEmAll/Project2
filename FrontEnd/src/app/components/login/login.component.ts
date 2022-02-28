
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay} from 'rxjs';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
//firebase
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { waitForAsync } from '@angular/core/testing';
import { stringify } from 'querystring';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-type:application/json',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*',
    // 'Authorization': 'Firebase JWT' + this._srvc.userToken
  })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLoggedIn!: boolean;// Flag user login
  signInForm!: FormGroup;
  firebaseErrorMessage!: string;
  email!:string;
  username!: string;
  password!:String;
  result!: boolean;
  user = {username: String, password: String};
  Credentials = {withCredentials: true};
  response : any ;
  //msgError="Invalid Credentials, Please Enter a Valid User Name And/or Password";
  msgError ="";
  constructor(private _http : HttpClient, private router : Router,  public auth: AngularFireAuth, public _srvc : AuthserviceService) {
   }

  

  ngOnInit(): void{
    //window.localStorage.clear();
    // this.response=this._http.post("localhost:3000/login",this.user, this.Credentials );
    this.signInForm = new FormGroup({
      'password': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email])
    });
  }
  Loginusr(e:any){
    if(e){
          e.preventDefault(); //prevents default form behavior
        }

    //Login user with firebase
    this._srvc.loginUser(this.signInForm.value.email, this.signInForm.value.password);

   
    
    let user = {username: this.signInForm.value.email,
                password: this.signInForm.value.password};
    let Credentials = {withCredentials: true};
    delay(5000);
    let response = this._http.post<any>("http://localhost:3000/login", user, httpOptions ).subscribe (
      {
      next: (v) =>  this.getToken(e),//this.router.navigate(['/frontpage']),  //console.log("reponse rcieved"),
      error: (e) => console.error(this.msgError="Invalid Credentials, Please Enter a Valid User Name And/or Password"),
      complete: () => window.localStorage.setItem("username", user.username)//console.info('Complete')
    }
    );

  };
  getToken(e: any){
    this._srvc.userLoggedIn = true 
  


    this.router.navigate(['/frontpage'])


  }

}
