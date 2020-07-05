import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  itemList:AngularFireList<any>;
  itemArray=[]
  itemnotList:AngularFireList<any>;
  itemnotArray=[]
  itemusersList:AngularFireList<any>;
  itemusersArray=[]
  counter:number;
  counterU:number;
  counterNU:number;

  constructor(public db:AngularFireDatabase) { 
    this.itemList=db.list('skills')
  
    this.itemList.snapshotChanges().subscribe(
      actions=>{
        actions.forEach(action=>{
          let y=action.payload.toJSON()
          y["$key"]=action.key
          this.itemArray.push(y as ListItemClass)

          
        })
        this.counter=this.itemArray.length
        

      }
    )
    this.itemusersList=db.list('users')
  
    this.itemusersList.snapshotChanges().subscribe(
      actions=>{
        actions.forEach(action=>{
          let y=action.payload.toJSON()
          y["$key"]=action.key
          this.itemusersArray.push(y as newListUserClass)

          
        })
        this.counterU=this.itemusersArray.length
        

      }
    )

    this.itemnotList=db.list('skillsManager')
  
    this.itemnotList.snapshotChanges().subscribe(
      actions=>{
        actions.forEach(action=>{
          let y=action.payload.toJSON()
          y["$key"]=action.key
          this.itemnotArray.push(y as ListnotItemClass)

          
        })
        this.counterNU=this.itemnotArray.length
        

      }
    )
    

  }

  ngOnInit(): void {
  }

}
export class ListItemClass{
  $key:string;
  titre:string;
  categorie:string;
  price:number;
  description:string;
  photo:string;
  keywords:string;
  delai_livraison:string;
  instruction_acheteur:string;
}
export class ListnotItemClass{
  $key:string;
  titre:string;
  categorie:string;
  price:number;
  description:string;
  photo:string;
  keywords:string;
  delai_livraison:string;
  instruction_acheteur:string;
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