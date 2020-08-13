import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  dataUser={
    description:'',
    emailUserBuy:'',
    emailUserPost:'',
    keyPost:'',
    nameUserBuy:'', 
    prenomUserBuy:'',
    price:0,
    telephoneUserBuy:'',
    titre: '',
    uidUserPost: '',
    uidUserbuy:'',
   }
   postdataUser={
    name:'',
    prenom:'',
    $key:'',
    uid:'',
    solde:0
  }
    ordersList:AngularFireList<any>;
    newuserList:AngularFireList<any>;
    public newuserArray=[]
    public ordersArray=[] 
    id:any
    dataUserBuyProduct={
      name:'',
      prenom:'',
      email:'',
      tel:''
     }
     finiched:boolean
     key:any
  constructor(public route:ActivatedRoute,private afauth:AngularFireAuth,public db:AngularFireDatabase, public routes:Router) { 

    this.id=this.afauth.auth.currentUser.uid
    this.ordersList = db.list('orders')
this.ordersList.snapshotChanges().subscribe(
  actions=>{
    actions.forEach(action=>{
      let x=action.payload.toJSON()
      x["$key"]=action.key
     this.ordersArray.push(x as newListUserClass)
    // this.dataUser.description=this.purchasesArray[0]['description']
     //this.dataUser.titre=this.purchasesArray[0]['titre']
     //this.dataUser.nameUserPost=this.purchasesArray[0]['nameUserPost']
     //this.dataUser.prenomUserPost=this.purchasesArray[0]['prenomUserPost']
    }) 
  })
  console.log(this.dataUser)
  this.finiched=false
/////////////////////////////////////
this.newuserList = db.list('users')
this.newuserList.snapshotChanges().subscribe(
  actions=>{
    actions.forEach(action=>{
      
      let x=action.payload.toJSON()
      x["$key"]=action.key
        if(x["uid"]==this.id){
     this.newuserArray.push(x as newListClass)
        this.postdataUser.name=this.newuserArray[0]['name']
        this.postdataUser.prenom=this.newuserArray[0]['prenom']
          this.postdataUser.$key=this.newuserArray[0]['$key']
          this.postdataUser.uid=this.newuserArray[0]['uid']
          this.postdataUser.solde=this.newuserArray[0]['solde']
    }
    }) 
  })

  }


  ngOnInit(): void {
  }
  verif(price,key){
    if(this.finiched==true){
      this.ordersList.update(key,{
        activefiniched:false
      })
      
      this.newuserList.update(this.postdataUser.$key,{
        solde:(Number(price)+Number(this.postdataUser.solde))
      })
      this.routes.navigate(['/profil/'+this.postdataUser.name+this.postdataUser.prenom+'/'+this.postdataUser.uid])
  }
    else{
      console.log("nothing")
    }

  }
  contact(name,prenom,email,tel){
    this.dataUserBuyProduct.name=name;
    this.dataUserBuyProduct.prenom=prenom;
    this.dataUserBuyProduct.email=email;
    this.dataUserBuyProduct.tel=tel;

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
  uidUserbuy:string;
  photo_profile:string;
  activefiniched:boolean;
  }
export class userprofit{
  $key:string;
}  
export class newListClass{
  $key:string;
  name:string;
  prenom:string;
  email:string;
  telephone:string;
  bio:string;
  photo:string;
}