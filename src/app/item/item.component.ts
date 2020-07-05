import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
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

  id: string;
  newid:string;
  titre:string;
  

  private sub: any;
  newemail:string;
  newuid:any;
  newitemList:AngularFireList<any>;
  public newitemArray=[]  
  constructor(public db:AngularFireDatabase,public route:ActivatedRoute,public routes:Router,private afauth:AngularFireAuth) { 
    this.sub= this.route.params.subscribe(params =>
      this.id=params['id']
     );
      this.newemail=this.afauth.auth.currentUser.email
      this.newid=this.afauth.auth.currentUser.uid
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
          this.data.keywords=this.newitemArray[0]['keywords']
          this.data.delai_livraison=this.newitemArray[0]['delai_livraison']
          this.data.instruction_acheteur=this.newitemArray[0]['instruction_acheteur']
        }
          

        }) 
      })
  }
  
  ngOnInit(): void {
    }
    
    update(titre,categorie,price,description,photo,delai_livraison,keywords,instruction_acheteur){
      this.newitemList.set(this.id,{
        titre:titre,
        categorie:categorie,
        price:price,
        description:description,
        photo:photo,
        delai_livraison:delai_livraison,
        keywords:keywords,
        instruction_acheteur:instruction_acheteur,
        email:this.newemail,
        uid:this.newid

      })
      this.routes.navigate(['/myskills'])
      

    } 
  }
  


export class newListItemClass{
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