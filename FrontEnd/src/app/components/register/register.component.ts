import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError} from 'rxjs';
import { of } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


const httpOptions   = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Headers': 'Content-type:application/json',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*'
  })
};


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup; //variable for data binding registration form
  firebaseErrorMessage!: string; //if there is an error this message will show on home page

  username!: String;
  password!: String;
  passwordc!: String;
  email!:String;
  user = {username: String,
          password: String,
          email_address: String,
          credit_card_name :String,
          credit_card_number : String,
          first_name: String,
          Last_name: String,
          Phone_number: String,
          Physical_address: String
        };
  response : any ;
  msgError ="";
  Credentials = {withCredentials: true};
  constructor(private _http : HttpClient, private router : Router, private afAuth: AngularFireAuth, private authService: AuthserviceService) { 
    this.firebaseErrorMessage = ''; 
  }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      'address': new FormControl('', [Validators.required, Validators.email]), 
      'password': new FormControl('', Validators.required),
      'passwordc': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required)
    });//Form group controls for firebase

  }


  registusr(e:any){
    if(e){
      e.preventDefault(); //prevents default form behavior
    }
    //this function will signup the User using firebase and send back an error message if the user isn't valid
    this.authService.signupUser({email:this.signupForm.value.address, password:this.signupForm.value.password})
    .then((result) => {
      if(result == null) //null result value means success
        console.log("Successfully created user in firebase!"); 
      else if(result.isValid == false) //false result means an error
        this.firebaseErrorMessage = result.message 
    });
    //Send password and email possibly username  to Google instead of to the database
    if(this.password == this.passwordc)
    {
      let user = {username:      this.signupForm.value.email,
                  password:      this.signupForm.value.password,
                  email_address: this.signupForm.value.address,
                  credit_card_name : "",
                  credit_card_number : "",
                  first_name: "",
                  last_name: "",
                  phone_number: "",
                  physical_address: ""
                };
      console.log(this.username);
      console.log(this.password);
      console.log(user);
      let Credentials = {withCredentials: true};
      let response =this._http.post<any>("http://localhost:3000/user/",user ,httpOptions,).subscribe (
        {
          
          next: (v) => this.router.navigate(['/']),  
          // console.log("reponse rcieved"),
          error: (e) => console.error(this.msgError="Email is already registered"),
          complete: () => console.info('Complete')
        });

      console.log(response);
  }
  else
  {
    this.msgError="passwords does not match, please revalidate your password"
  }
  }
}