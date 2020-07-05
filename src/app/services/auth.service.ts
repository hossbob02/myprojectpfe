import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:Observable<firebase.User>
  constructor(private afauth:AngularFireAuth) {
    this.user=afauth.user

   }


  signup(email,password){
   return this.afauth.auth.createUserWithEmailAndPassword(email,password)
  }
  login(email,password){
    return this.afauth.auth.signInWithEmailAndPassword(email,password)
  }
  logout(){
return this.afauth.auth.signOut()

  }

}
