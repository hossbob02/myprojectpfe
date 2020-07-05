

import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUser:Boolean=false
  newuserList:AngularFireList<any>;
  dataUserr={
    name:'',
    prenom:'',
    email:'',
    telephone:'',
    photo:''
  }
  emailState:string=''
  uid:any
  public newuserArray=[] 
  emailLogin:any
  testEmail:boolean
  constructor(public db:AngularFireDatabase,private as:AuthService,private router:Router,private afauth:AngularFireAuth) {
      this.as.user.subscribe(userr=>{
        if(userr){
    this.emailState=this.afauth.auth.currentUser.email
    this.uid=this.afauth.auth.currentUser.uid
  // get data from users started here
  this.newuserList = db.list('users')
  this.newuserList.snapshotChanges().subscribe(
    actions=>{
      actions.forEach(action=>{
        
        let x=action.payload.toJSON()
        x["$key"]=action.key
        if(x["email"]==this.emailState){
       this.newuserArray.push(x as newListUserClass)
          this.dataUserr.name=this.newuserArray[0]['name']
          this.dataUserr.prenom=this.newuserArray[0]['prenom']
          this.dataUserr.email=this.newuserArray[0]['email']
          this.dataUserr.telephone=this.newuserArray[0]['telephone']
          this.dataUserr.photo=this.newuserArray[0]['photo_profile']
        }
      
      }) 
    })
  // get data from users end here 
}})
  

  }

  ngOnInit(): void {
    this.as.user.subscribe(user=>{
      if(user){this.isUser=true}
      else{this.isUser=false}

    })
  this.as.user.subscribe(testUser=>{
    if((testUser) && (this.afauth.auth.currentUser.email=="admin@allezpapa.com")){
      this.testEmail=true
    }else{
      this.testEmail=false
    }
  })    
  }
  

  logout(){
this.as.logout().then(res=>{
  console.log(res)
this.router.navigate(['/login'])

})

  }
}
export class newListUserClass{
  name:string;
  prenom:string;
  email:string;
  telephone:string;
  photo:string;
}