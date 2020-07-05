import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-skills-manager',
  templateUrl: './skills-manager.component.html',
  styleUrls: ['./skills-manager.component.css']
})
export class SkillsManagerComponent implements OnInit {
  acceptskills={
    accept:''
  }
  details={
    titre:'',
    price:'',
    description:'',
    photo:'',
    keywords:'',
    telephone:'',
    instruction_acheteur:'',
    delai_livraison:''

  }
  itemList:AngularFireList<any>;
  itemSkillsManager:AngularFireList<any>;

  itemArray=[]
  constructor(public db:AngularFireDatabase) { 

    
    this.itemList=db.list('skillsManager')
    this.itemList.snapshotChanges().subscribe(
      actions=>{
        actions.forEach(action=>{
          let y=action.payload.toJSON()
          y["$key"]=action.key
          this.itemArray.push(y as ListItemClass)

        })


      }
    )
    this.itemSkillsManager=db.list('skills')

  }
test($key,testAccept,titre,price,categorie,description,photo,keywords,email,name,prenom,uid,telephone,photo_profile,instruction_acheteur,delai_livraison){
  if(testAccept!=true){
  this.itemSkillsManager.push({
    titre:titre,
  categorie:categorie,
  price:price,
  description:description,
  photo:photo,
  keywords:keywords,
  delai_livraison:delai_livraison,
  instruction_acheteur:instruction_acheteur,
  email:email,
  uid:uid,
  name:name,
  prenom:prenom,
  telephone:telephone,
  photo_profile:photo_profile
  })
  this.itemList.update($key,{
    testAccept:true
  })
  this.itemArray=[]
  console.log("accepted")
}else{
  console.log("deja added")
}

}
delete(key){
  this.itemList.remove(key)
  this.itemArray=[]
}
detail(titre,price,description,photo,keywords,telephone,instruction_acheteur,delai_livraison){
this.details.titre=titre;
this.details.description=description;
this.details.telephone=telephone;
this.details.price=price;
this.details.keywords=keywords;
this.details.instruction_acheteur=instruction_acheteur;
this.details.delai_livraison=delai_livraison
this.details.photo=photo;
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