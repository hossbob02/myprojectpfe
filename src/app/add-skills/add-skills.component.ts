import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.css']
})
export class AddSkillsComponent implements OnInit {

  email:string='';
  uId:any

  data={
    titre:'',
    categorie:'',
    price:0,
    description:'',
    photo:'assets/img/add-image.png',
    keywords:'',
    delai_livraison:'',
    instruction_acheteur:''
  }
  dataUserPost={
    name:'',
    prenom:'',
    telephone:'',
    photo_profile:''
  
  }
  newuserList:AngularFireList<any>;
  public newuserArray=[]
  itemList:AngularFireList<any>;
  id:any
  testAccept:boolean
  
  constructor(public db:AngularFireDatabase,public route:Router,private afauth:AngularFireAuth) {
    this.id=this.afauth.auth.currentUser.uid
  this.testAccept=false
    this.newuserList = db.list('users')
     this.newuserList.snapshotChanges().subscribe(
      actions=>{
        actions.forEach(action=>{
          
          let x=action.payload.toJSON()
          x["$key"]=action.key
            if(x["uid"]==this.id){
         this.newuserArray.push(x as newListUserClass)
            this.dataUserPost.name=this.newuserArray[0]['name']
            this.dataUserPost.prenom=this.newuserArray[0]['prenom']
            this.dataUserPost.telephone=this.newuserArray[0]['telephone']
            this.dataUserPost.photo_profile=this.newuserArray[0]['photo_profile']

        }
    
        }) 
      })
      this.itemList=db.list('skillsManager')
   }

  ngOnInit(): void {
    let user=this.afauth.auth.currentUser.email
    let uId=this.afauth.auth.currentUser.uid
    this.email=user
    this.uId=uId
  }
  insertskill(){
    this.itemList.push({
      titre:this.data.titre,
    categorie:this.data.categorie,
    price:this.data.price,
    description:this.data.description,
    photo:this.data.photo,
    keywords:this.data.keywords,
    delai_livraison:this.data.delai_livraison,
    instruction_acheteur:this.data.instruction_acheteur,
    email:this.email,
    uid:this.uId,
    name:this.dataUserPost.name,
    prenom:this.dataUserPost.prenom,
    telephone:this.dataUserPost.telephone,
    photo_profile:this.dataUserPost.photo_profile,
    testAccept:this.testAccept

    })
    this.route.navigate(['/myskills'])
  }
}
export class newListUserClass{
  name:string;
  prenom:string;
  telephone:string;
  photo_profile:string;
 
}