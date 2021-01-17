import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth'
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false
  constructor(public firebaseAuth:AngularFireAuth, public router: Router,public db : AngularFireDatabase) { }
  async signin(email:string , password :string ){

    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then((res)=>{

      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
      
      this.router.navigate(["/home"])
    })
  }

  async signup(email:string , password :string , fullName : string){

    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then((res)=>{

      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
      this.db.list('users').push({uid : res.user.uid, admin : false , fullName,email : email,});
      this.router.navigate(["/home"])
    })
  }
  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem("user")
    this.router.navigate(["/signin"])
  }
}
