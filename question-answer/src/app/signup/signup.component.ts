import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isSignedIn = false
  constructor(public firebaseService : FirebaseService ) { }

  ngOnInit() {

  }
  async onSignup(email:string,password:string,fullName : string){

    await this.firebaseService.signup(email,password,fullName)
  
  }
}
