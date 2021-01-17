import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'question-answer';
  description = "Angular8-Question-Answer";

  itemValue = "";
  items:Observable<any[]>;
  userInfo = "";
  users : any;
  answers:any;



  constructor(public db : AngularFireDatabase){

    this.items = db.list('items').valueChanges()
 
    
  }

  onSubmit(){
    
    this.db.list('items').push({content : this.itemValue});
    this.itemValue = "";
  }

  ngOnInit() {
    this.getCustomersList();
    this.getAnswerList();
   
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




  getAnswerList(){

    this.db.list('answers').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(ans => {
    
      let user = JSON.parse(localStorage.getItem("user"))
      this.answers = ans.filter((item:any)=> item.uid === user.uid)
     
    });

  }

 



}
