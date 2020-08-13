import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private as:AuthService,private route:Router) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean | Observable<boolean> | Promise<boolean>{
return new Promise(resolve=>{
this.as.user.subscribe(user=>{
  if(user){ resolve(false)
  this.route.navigate(['/home'])
  }
  else{
 resolve(true)
  }
})

})

  }
}
