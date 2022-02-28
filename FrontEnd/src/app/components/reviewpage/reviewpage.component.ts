import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokeDataService } from 'src/app/poke-data.service';
import { PokeReviewService } from 'src/app/poke-review.service';

@Component({
  selector: 'app-reviewpage',
  templateUrl: './reviewpage.component.html',
  styleUrls: ['./reviewpage.component.css']
})
export class ReviewpageComponent implements OnInit {
  pokemon:any=null;
  pokeid:number;
  rev:any=[];
  numof5:number=0;
  numof4:number=0;
  numof3:number=0;
  numof2:number=0;
  numof1:number=0;
  sum:number=0;
  norev:string;
  percentof5:number=0;
  percentof4:number=0;
  percentof3:number=0;
  percentof2:number=0;
  percentof1:number=0;
  name:string;
  isVisible: boolean = true;
  rating:number;
  pokeid2:string;
  constructor(private rs:PokeReviewService,private ps:PokeDataService,private router:Router) { }

  ngOnInit(): void {
    
    
    console.log(this.rs.pokeid)
    console.log(this.isVisible)
    this.isVisible=false;
    setTimeout(() => {
      
      this.rev=this.rs.reviewsarray
      console.log(this.rs.reviewsarray)
      if(this.rs.reviewsarray === null){
        this.ps.getPokemonFromApinum(this.rs.pokeid).subscribe(
          (data:any)=>{
            console.log(data.body)
            this.pokemon=data.body;
          }
        )
            this.isVisible=true;
            this.numof1=0;
            this.numof2=0;
            this.numof3=0;
            this.numof4=0;
            this.numof5=0;
            this.sum=0;
            this.percentof1=0;
            this.percentof2=0;
            this.percentof3=0;
            this.percentof4=0;
            this.percentof5=0;
            console.log("no reviews")
        
      }
      for(var i = 0; i < this.rev.length; ++i){
        if(this.rev[i].rating === 1)
            this.numof1++;
        else if(this.rev[i].rating === 2)
            this.numof2++;   
        else if(this.rev[i].rating === 3)
            this.numof3++;   
        else if(this.rev[i].rating === 4)
            this.numof4++;   
        else if(this.rev[i].rating === 5)
            this.numof5++; 
        else if(this.rev[i].rating === null)
            this.norev="no reviews yet"
      }
      this.sum=this.numof1+this.numof2+this.numof3+this.numof4+this.numof5;
      this.percentof1=this.numof1/this.sum*100;
      this.percentof2=this.numof2/this.sum*100;
      this.percentof3=this.numof3/this.sum*100;
      this.percentof4=this.numof4/this.sum*100;
      this.percentof5=this.numof5/this.sum*100;
      this.ps.getPokemonFromApinum(this.rs.pokeid).subscribe(
        (data:any)=>{
          console.log(data.body)
          this.pokemon=data.body;
        }
      )
    }, 250);
    
    
    
    this.rs.reviewsarray=null;
  }
  getPokemon():void{
    
    this.ps.getPokemonFromApi(this.name).subscribe(
    
  
      //get the data out of the observable that we subscribe to, and put it into a Pokemon object
      (data:any) => {
        this.isVisible=false;
        let response:String = data.status;//gets the status code
        console.log(response);
        //assign it to our pokemon variable above
        this.pokemon = data.body;
        //we may have to do something with sprites
        console.log(this.pokemon.id) //will be helpful for debugs
        console.log(this.pokemon)
        this.pokeid=this.pokemon.id
        this.rs.getAllReviewByPokemonId(this.pokemon.id).subscribe(
          (data:any) => {
            
            this.rs.reviewsarray=data.body;
            
            console.log(this.rs.reviewsarray)
            setTimeout(() => {
              this.rev=this.rs.reviewsarray
              console.log(this.rs.reviewsarray)
              this.numof1=0;
              this.numof2=0;
              this.numof3=0;
              this.numof4=0;
              this.numof5=0;
              this.sum=0;
              for(var i = 0; i < this.rs.reviewsarray.length; ++i){
                if(this.rev[i].rating === 1)
                    this.numof1++;
                else if(this.rev[i].rating === 2)
                    this.numof2++;   
                else if(this.rev[i].rating === 3)
                    this.numof3++;   
                else if(this.rev[i].rating === 4)
                    this.numof4++;   
                else if(this.rev[i].rating === 5)
                    this.numof5++; 
                else if(this.rev[i].rating === null)
                    this.norev="no reviews yet"
              }
              this.sum=this.numof1+this.numof2+this.numof3+this.numof4+this.numof5;
              this.percentof1=this.numof1/this.sum*100;
              this.percentof2=this.numof2/this.sum*100;
              this.percentof3=this.numof3/this.sum*100;
              this.percentof4=this.numof4/this.sum*100;
              this.percentof5=this.numof5/this.sum*100;
              console.log(this.percentof1)
              console.log(this.sum)
            }, 250);
            
            
            
            
            // this.router.navigate(["/reviews/"+this.pokemon.id]);
            //this.rating=data.body.rating;
           // console.log(data.body)
           // console.log(this.rs.reviewsarray)
            //this.rp.getreviews(id);
          },
          () => { //incase of errors, set pokemon object to null since we didn't get anything back
            this.isVisible=true;
            this.numof1=0;
            this.numof2=0;
            this.numof3=0;
            this.numof4=0;
            this.numof5=0;
            this.sum=0;
            this.percentof1=0;
            this.percentof2=0;
            this.percentof3=0;
            this.percentof4=0;
            this.percentof5=0;
            console.log("no reviews")
          }
        )
      },
  
      () => { //incase of errors, set pokemon object to null since we didn't get anything back
        this.pokemon = null
        console.log("It got away!!!")
      }
    )
  
  }

}
