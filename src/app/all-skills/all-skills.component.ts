import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-all-skills',
  templateUrl: './all-skills.component.html',
  styleUrls: ['./all-skills.component.css']
})
export class AllSkillsComponent implements OnInit {
  dataCategorie={
    categorie:'All categorie'
  }
   allcategorie='All categorie'
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
  itemList:AngularFireList<any>;
  itemArray=[]
  public newuserArray=[]
  newuserList:AngularFireList<any>;
  id:any
  PurchasesList:AngularFireList<any>;
  OrdersList:AngularFireList<any>;
  itemFavoris:AngularFireList<any>;
  test:boolean
  activefiniched:boolean
  constructor(public db:AngularFireDatabase,public route:Router,public routes:ActivatedRoute,private afauth:AngularFireAuth) {
    this.id=this.afauth.auth.currentUser.uid
    
    
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
 //get user data 
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
     }
 
     }) 
   })
   this.activefiniched=true
 //get user data end here
 this.PurchasesList=db.list('purchases')
 this.itemFavoris=db.list('favoris')
   }

  ngOnInit(): void {
  }
  affichecat(){
console.log(this.dataCategorie.categorie)

  }  
  onEdit(key){
    
    this.route.navigate(['/item/'+key])
  }
  onDelete($key){
    this.itemList.remove($key);
    this.itemArray=[];

  }
  details(key){

    this.route.navigate(['/item-detail/'+key])

  }
  AddToFavoris(key,titre,price,description,photo){
    this.itemFavoris.push({
    key:key,
    titre:titre,
    price:price,
    description:description,
    photo:photo,
    uid:this.id
    })
    this.route.navigate(['/favoris'])


  }
  buy(price,key,titre,description,emailUserPost,uid,name,prenom,telephone,photopost){
  
    if(price<this.dataUser.solde){
      
      this.PurchasesList.push({
        titre:titre,
        description:description,
        price:price,
        keyPost:key,
        emailUserPost:emailUserPost,
        uidUserPost:uid,
        uidUserbuy:this.id,
        emailUserBuy:this.dataUser.email,
        nameUserPost:name,
        prenomUserPost:prenom,
        telephoneUserPost:telephone,
        photo_profile:photopost

        
      })
      this.OrdersList=this.db.list('orders')
      this.OrdersList.push({
        titre:titre,
        description:description,
        price:price,
        keyPost:key,
        emailUserPost:emailUserPost,
        uidUserPost:uid,
        uidUserbuy:this.id,
        emailUserBuy:this.dataUser.email,
        nameUserBuy:this.dataUser.name,
        prenomUserBuy:this.dataUser.prenom,
        telephoneUserBuy:this.dataUser.telephone,
        photo_profile:this.dataUser.photo,
        activefiniched:this.activefiniched
      });
      this.newuserList.update(this.dataUser.$key,{
        solde:this.dataUser.solde-price
      })
      this.route.navigate(['/purchases'])
      console.log(this.PurchasesList)
    }else{console.log('solde>price')}
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
export class newListUserClass{
  $key:string;
  name:string;
  prenom:string;
  email:string;
  telephone:string;
  bio:string;
  photo:string;
}
export class ListFavorisClass{
  key:string;
  titre:string;
  price:number;
  description:string;
 photo:string;
 uid:string;
}
