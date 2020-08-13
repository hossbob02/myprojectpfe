import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { $ } from 'protractor';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.css']
})
export class MySkillsComponent implements OnInit {
  data={
    titre:'',
    categorie:'',
    price:'',
    description:'',
    photo:'',
    keywords:'',
    delai_livraison:'',
    instruction_acheteur:''
  }

  uId:any
  itemList:AngularFireList<any>;
itemArray=[]
veriflength:boolean
  constructor(public db:AngularFireDatabase,public route:Router,public routes:ActivatedRoute,private afauth:AngularFireAuth) { 
    this.itemList=db.list('skills')
    this.itemList.snapshotChanges().subscribe(
      actions=>{
        actions.forEach(action=>{
          let y=action.payload.toJSON()
          y["$key"]=action.key
          this.itemArray.push(y as ListItemClass)

        })


      }
    )
      this.uId=this.afauth.auth.currentUser.uid
 console.log(this.itemArray.length)
 if(this.itemArray.length!==0){
  this.veriflength=true
}else{
  this.veriflength=false
}
  }

  ngOnInit(): void {
 
   
  }
  onEdit(key){
    
    this.route.navigate(['/item/'+key])
  }
  onDelete($key){
    this.itemList.remove($key);
    this.itemArray=[];

  }
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
