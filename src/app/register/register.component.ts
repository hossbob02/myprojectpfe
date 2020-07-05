import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  uId:any
  imageprofile:any="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Tunisia_logo.svg/1024px-Tunisia_logo.svg.png"
  itemList:AngularFireList<any>;

  constructor(private as:AuthService,private router:Router,public db:AngularFireDatabase,private afauth:AngularFireAuth) { 
    
    this.itemList=db.list('users')

  }

  ngOnInit(): void {
   
  }
  signup(f){
    let data=f.value;
 
    
    this.as.signup(data.email,data.password)
    .then(res=>{
      console.log(res)
      this.uId=this.afauth.auth.currentUser.uid
      this.itemList.push({
        name:data.name,
      prenom:data.prenom,
      email:data.email,
      photo_profile:this.imageprofile,
      adresse:data.adresse,
      telephone:data.telephone,
      bio:data.bio,
      solde:0,
        uid:this.uId,
        feedback:0
  })
      this.router.navigate(['/home'])
    })
    .catch(err=>console.log(err))


 
  }
  
 
  
}
