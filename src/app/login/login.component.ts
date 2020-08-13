import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  valid:boolean
  spinner:boolean
  constructor(private as:AuthService,private router:Router,private afauth:AngularFireAuth) {
  }

  ngOnInit(): void {
    
  }
  login(f){
    this.spinner=true
let data=f.value
this.as.login(data.email,data.password)
.then(res=>{
  console.log(res)
  this.router.navigate(['/home'])
})
    .catch(err=>{console.log(err)
    this.valid=true
    }
    )

  }
}

