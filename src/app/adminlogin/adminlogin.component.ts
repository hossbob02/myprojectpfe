import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private as:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  login(f){
    let data=f.value
    this.as.login(data.email,data.password)
    .then(res=>{
      console.log(res)
      this.router.navigate(['/dashboard'])
    })
        .catch(err=>console.log(err))
    
      }

}
