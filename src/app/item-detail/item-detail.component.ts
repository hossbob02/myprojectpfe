import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Router,ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  data={
    titre:'',
    categorie:'',
    price:0,
    description:'',
    photo:'',
    delai_livraison:'',
    email:''
  }
  dataUser={
    name:'',
    prenom:'',
    email:'',
    telephone:'',
    bio:'',
    photo:'',
    uid:''
  }
  id:string=''
  email:string=''
  private sub: any;
  newitemList:AngularFireList<any>;
  newuserList:AngularFireList<any>;
  public newitemArray=[] 
  public newuserArray=[] 
  constructor(public db:AngularFireDatabase,public route:ActivatedRoute,private afauth:AngularFireAuth,public routee:Router) {
    this.sub= this.route.params.subscribe(params =>
      this.id=params['id']
     );
      this.email=this.afauth.auth.currentUser.email
     
    //get data from skills started here
     this.newitemList=db.list('skills')
    this.newitemList.snapshotChanges().subscribe(
      actions=>{
        actions.forEach(action=>{
          
          let y=action.payload.toJSON()
          y["$key"]=action.key
          if(action.key==this.id){
          this.newitemArray.push(y as newListItemClass) 
          this.data.titre=this.newitemArray[0]['titre']
          this.data.categorie=this.newitemArray[0]['categorie']
          this.data.price=this.newitemArray[0]['price']
          this.data.description=this.newitemArray[0]['description']
          this.data.photo=this.newitemArray[0]['photo']
          this.data.delai_livraison=this.newitemArray[0]['delai_livraison']
          this.data.email=this.newitemArray[0]['email']

        }
          

        }) 
      })
      // get data from skills end here
      console.log(this.data)
       // get data from users started here
       this.newuserList = db.list('users')
       this.newuserList.snapshotChanges().subscribe(
         actions=>{
           actions.forEach(action=>{
             
             let x=action.payload.toJSON()
             x["$key"]=action.key
             console.log(x["email"])
               if(x["email"]==this.data.email){
            this.newuserArray.push(x as newListUserClass)
               this.dataUser.name=this.newuserArray[0]['name']
               this.dataUser.prenom=this.newuserArray[0]['prenom']
               this.dataUser.email=this.newuserArray[0]['email']
               this.dataUser.telephone=this.newuserArray[0]['telephone']
               this.dataUser.bio=this.newuserArray[0]['bio']
               this.dataUser.photo=this.newuserArray[0]['photo_profile']
              this.dataUser.uid=this.newuserArray[0]['uid']
           }
             console.log(this.dataUser)
   
           }) 
         })
         console.log(this.dataUser.name)
       // get data from users end here 
   }

   goprofile(name,prenom,uid){
    this.routee.navigate(['/profil/'+name+prenom+'/'+uid])
  }
  ngOnInit(): void {
  }

}
export class newListItemClass{
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
  name:string;
  prenom:string;
  email:string;
  telephone:string;
  bio:string;
  photo:string;
}