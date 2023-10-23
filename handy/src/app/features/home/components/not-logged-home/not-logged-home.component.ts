import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'not-logged-home',
  templateUrl: './not-logged-home.component.html',
  styleUrls: ['./not-logged-home.component.css']
})
export class NotLoggedHomeComponent implements OnInit {

  ngOnInit(): void {
  }

  userId = null;

  get userIsLogged(){
    return this.userId != null;
  }

}
