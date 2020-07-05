import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataUserr={
    name:'',
    prenom:'',
    email:'',
    telephone:'',
    photo:'',
    uid:''
  }
  usersList:AngularFireList<any>;
  itemList:AngularFireList<any>;
usersArray=[]
itemArray=[]
uid:any
email:any
  constructor(private as:AuthService,public db:AngularFireDatabase,public route:Router,public routes:ActivatedRoute,private afauth:AngularFireAuth) {
    this.itemList=db.list('skills')
    this.usersList=db.list('users')
    this.usersList.snapshotChanges().subscribe(
      actions=>{
        actions.forEach(action=>{
          let y=action.payload.toJSON()
          y["$key"]=action.key
          this.usersArray.push(y as ListUsersClass)

        })


      }
    )

this.uid=this.afauth.auth.currentUser.email
this.email="admin@allezpapa.com"
   }

  ngOnInit(): void {
       if(this.uid!=this.email){
         this.route.navigate(['/home'])
       }
  }
  delete(key){
    
    console.log(key);
    this.usersList.remove(key);
    this.usersArray=[]
  }
  show(name,prenom,uid){
    this.dataUserr.name=name
    this.dataUserr.prenom=prenom
    this.dataUserr.uid=uid
    this.route.navigate(['/profil/'+this.dataUserr.name+this.dataUserr.prenom+'/'+this.dataUserr.uid])
  }

}
export class ListUsersClass{
  $key:string;
  photo_profile:string;
  name:string;
  prenom:string;
  email:string;
  price:number;
  feedback:number;
  uid:string;
}
export class ListItemClass{
  $key:string;
  titre:string;
  categorie:string;
  price:string;
  description:string;
  photo:string;
  keywords:string;
  delai_livraison:string;
  instruction_acheteur:string;
}