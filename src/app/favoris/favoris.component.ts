import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  uId:any
  itemFavorisList:AngularFireList<any>;
itemArray=[]
  constructor(public db:AngularFireDatabase,public route:Router,public routes:ActivatedRoute,private afauth:AngularFireAuth) { 
    this.itemFavorisList=db.list('favoris')
    this.itemFavorisList.snapshotChanges().subscribe(
      actions=>{
        actions.forEach(action=>{
          let y=action.payload.toJSON()
          y["$key"]=action.key
          this.itemArray.push(y as ListFavorisClass)

        })


      }
    )

      this.uId=this.afauth.auth.currentUser.uid

  }
  onDelete($key){
    this.itemFavorisList.remove($key);
    this.itemArray=[];

  }
  details(key){

    this.route.navigate(['/item-detail/'+key])

  }
  ngOnInit(): void {
  }

}
export class ListFavorisClass{
  key:string;
  titre:string;
  price:number;
  description:string;
  photo:string;
  uid:string;
}