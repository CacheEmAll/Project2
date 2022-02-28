import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { of } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-type:application/json',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*'
  })
};



@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  username!: string;
  password!: String;
  email!: String;
  card_name!: String;
  card_number!: String;
  firstname!: String;
  lastname!: String;
  phonenumber!: String;
  physicaladdress!: String;
  usrID!: String;
  user = {
    user_id: String,
    username: String,
    password: String,
    email_address: String,
    credit_card_name: String,
    credit_card_number: String,
    first_name: String,
    last_name: String,
    phone_number: String,
    physical_address: String
  };
  response: any;
  msgError = "";
  Credentials = { withCredentials: true };
  uname: string;
  pswrd: String;

  reset!: FormGroup;
  constructor(private _http: HttpClient, private router: Router, private afAuth: AngularFireAuth, private route: ActivatedRoute) { }

   code = this.route.snapshot.queryParams['oobCode'];
  //  userEmail = this.reset.controls['email'].value;
  // userEmail = this.reset.controls['email'].value;

  getUserByUsername(lusername: any): Observable<HttpResponse<User>> {
    return this._http.get<any>("http://localhost:3000/user/username/" + lusername + "/", { observe: "response" }) as Observable<HttpResponse<User>>
  }

  ngOnInit(): void {

    this.reset = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });//Form group controls for firebase

  }
  resetpasswordusr(e: any) {

    if (e) {
      e.preventDefault(); //prevents default form behavior
    }

    // this.afAuth.confirmPasswordReset(this.code, this.reset.value.password).then(()=>{
    //   console.log("Password successfully reset in firebase");
    // });

    
    

    // const email = this.frmPasswordReset.controls['email'].value;

    // this.afAuth.auth.sendPasswordResetEmail(email).then(
    //   () => {
    //     // success, show some message
    //   },
    //   err => {
    //     // handle errors
    //   }
    // );
    



    let uname = this.reset.value.email;
    console.log("The username is..." + uname);
    //--------------------------------------

    this.getUserByUsername(uname).subscribe(
      (data: any) => {
        this.user = data;
        //let response: String = data.response;
        console.log(this.user)
        this.user = data.body;
        for (let usr of data.body) {
          this.username = usr.username;
          this.email = usr.email_address;
          this.firstname = usr.first_name;
          this.lastname = usr.last_name;
          this.phonenumber = usr.phone_number;
          this.physicaladdress = usr.physical_address;
          this.card_number = usr.credit_card_number;
          this.card_name = usr.credit_card_name;
          this.usrID = usr.user_id;
          this.pswrd = usr.password;
        }
      }
    );

    //-----------------------------------

    setTimeout(() => {
      console.log("user ID from DB...:" + this.usrID);
      if (this.reset.value.password != this.pswrd) {
        let user = {
          user_id: this.usrID,
          username: this.reset.value.email,
          password: this.reset.value.password,
          email_address: this.reset.value.email,
          credit_card_name: this.card_name,
          credit_card_number: this.card_number,
          first_name: this.firstname,
          Last_name: this.lastname,
          Phone_number: this.phonenumber,
          Physical_address: this.physicaladdress
        };
        console.log(this.reset.value.email);
        console.log(this.reset.value.password);
        console.log(user);
        let Credentials = { withCredentials: true };

        let response = this._http.put<any>("http://localhost:3000/reset", user, httpOptions,).subscribe(
          {
            next: (v) => this.resetPasswdFirebase(),
            error: (e) => console.error(this.msgError = "User name or password is undefined "),
            complete: () => console.info('Complete')
          });

        console.log(response);
      }
      else {
        this.msgError = "You need to choose a different password "
      }
    }, 1000);

  }

  resetPasswdFirebase(){
    this.afAuth.sendPasswordResetEmail(this.reset.value.email).then(
      () => {
         console.log("Password successfully reset in firebase");
         this.afAuth.confirmPasswordReset(this.code, this.reset.value.password).then(()=>{
            console.log("Password successfully confirmed in firebase");
          });
      },
      err => {
          console.log("Password NOT successfully reset in firebase");
      }
    );

    this.router.navigate(['/'])
  }

}
