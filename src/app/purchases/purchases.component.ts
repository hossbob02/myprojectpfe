import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
 dataUser={
  description:'',
  emailUserBuy:'',
  emailUserPost:'',
  keyPost:'',
  nameUserPost:'', 
  prenomUserPost:'',
  price:0,
  telephoneUserPost:'',
  titre: '',
  uidUserPost: '',
  uidUserbuy:'',
 }
 dataUserPostProduct={
  name:'',
  prenom:'',
  email:'',
  tel:''
 }
  puchasesList:AngularFireList<any>;
  public purchasesArray=[] 
  id:any
  constructor(public route:ActivatedRoute,private afauth:AngularFireAuth,public db:AngularFireDatabase, public routes:Router) {
    this.id=this.afauth.auth.currentUser.uid
    this.puchasesList = db.list('purchases')
this.puchasesList.snapshotChanges().subscribe(
  actions=>{
    actions.forEach(action=>{
      let x=action.payload.toJSON()
      x["$key"]=action.key
     this.purchasesArray.push(x as newListUserClass)
    // this.dataUser.description=this.purchasesArray[0]['description']
     //this.dataUser.titre=this.purchasesArray[0]['titre']
     //this.dataUser.nameUserPost=this.purchasesArray[0]['nameUserPost']
     //this.dataUser.prenomUserPost=this.purchasesArray[0]['prenomUserPost']


    

    }) 
  })
  console.log(this.dataUser)
   }

  ngOnInit(): void {
  }
  contact(name,prenom,email,tel){
    this.dataUserPostProduct.name=name;
    this.dataUserPostProduct.prenom=prenom;
    this.dataUserPostProduct.email=email;
    this.dataUserPostProduct.tel=tel;

  }


}
export class newListUserClass{
description: string;
emailUserBuy:string ;
emailUserPost: string;
keyPost: string;
nameUserPost: string;
prenomUserPost: string;
price:0;
telephoneUserPost:string; 
titre: string;
uidUserPost: string;
uidUserbuy:string
photo_profile:string
}