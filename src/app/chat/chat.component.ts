import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  id:string=''
  private sub: any;
  constructor(public route:ActivatedRoute) { 

    this.sub= this.route.params.subscribe(params =>
      this.id=params['id']
     );
     console.log("this key page"+this.id);
  }

  ngOnInit(): void {
  }

}
