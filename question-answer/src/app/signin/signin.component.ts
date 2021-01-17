import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isSignedIn = false
  constructor(public firebaseService : FirebaseService ) { }

  ngOnInit() {

  }
  async onSignin(email:string,password:string){

    await this.firebaseService.signin(email,password)
    
  }

}
