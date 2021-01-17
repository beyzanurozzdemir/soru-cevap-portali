import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { map } from 'rxjs/operators'
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userInfo = "";
  users : any;
  constructor(public firebaseService : FirebaseService,public db : AngularFireDatabase) { }

  ngOnInit() {
    this.getCustomersList();
  }
  async logout(){

    await this.firebaseService.logout()
    
  }


   
  getCustomersList() {
    this.db.list('users').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(users => {
      console.log(users,"wwwwwwwwwww")
      let user = JSON.parse(localStorage.getItem("user"))
      let find :any = users.find((item:any)=> item.uid === user.uid)
      this.userInfo = find.fullName
      this.users = users;
    });
  }

}
