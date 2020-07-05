

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  id:string='';
  dataUser={
    name:'',
    prenom:'',
    email:'',
    telephone:'',
    bio:'',
    photo:'',
    solde:0,
    feedback:'',
    $key:''
  }
  dataProfileUpdate={
    name:'',
    prenom:'',
    photo:'',
    telephone:'',
    solde:0
  }
  usersession:boolean
  email:string=''
  uidstate:string=''
  private sub: any;
  newuserList:AngularFireList<any>;
  public newitemArray=[] 
  public newuserArray=[]
  constructor(public route:ActivatedRoute,private afauth:AngularFireAuth,public db:AngularFireDatabase, public routes:Router) {
    this.route.params.subscribe(params=>{this.id=params['id']})

// get data from users started here
this.newuserList = db.list('users')
this.newuserList.snapshotChanges().subscribe(
  actions=>{
    actions.forEach(action=>{
      
      let x=action.payload.toJSON()
      x["$key"]=action.key
        if(x["uid"]==this.id){
     this.newuserArray.push(x as newListUserClass)
        this.dataUser.name=this.newuserArray[0]['name']
        this.dataUser.prenom=this.newuserArray[0]['prenom']
        this.dataUser.email=this.newuserArray[0]['email']
        this.dataUser.telephone=this.newuserArray[0]['telephone']
        this.dataUser.bio=this.newuserArray[0]['bio']
        this.dataUser.photo=this.newuserArray[0]['photo_profile']
        this.dataUser.solde=this.newuserArray[0]['solde']
        this.dataUser.feedback=this.newuserArray[0]['feedback']
          this.dataUser.$key=this.newuserArray[0]['$key']
          this.dataProfileUpdate.name=this.dataUser.name
          this.dataProfileUpdate.prenom=this.dataUser.prenom
          this.dataProfileUpdate.telephone=this.dataUser.telephone
          this.dataProfileUpdate.solde=this.dataUser.solde
          this.dataProfileUpdate.photo=this.dataUser.photo
    }

      console.log(this.dataUser.$key)

    }) 
  })
// get data from users end here 

if(this.id==this.afauth.auth.currentUser.uid){
  this.usersession=true
}
  }

  ngOnInit(): void {
  }

  update(){
  console.log(this.dataProfileUpdate)
  this.newuserList.update(this.dataUser.$key,{
    name:this.dataProfileUpdate.name,
    prenom:this.dataProfileUpdate.prenom,
    telephone:this.dataProfileUpdate.telephone,
    photo_profile:this.dataProfileUpdate.photo
    })
    this.routes.navigate(['/home'])
  }
  updateSolde(){
    console.log(this.dataProfileUpdate)
    this.newuserList.update(this.dataUser.$key,{
      solde:this.dataProfileUpdate.solde,
  
      })
      this.routes.navigate(['/home'])
    } 
  

}

  

export class newListUserClass{
  $key:string;
  name:string;
  prenom:string;
  email:string;
  telephone:string;
  bio:string;
  photo:string;
}