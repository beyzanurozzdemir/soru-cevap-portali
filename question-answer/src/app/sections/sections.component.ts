import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})

export class SectionsComponent implements OnInit {

  sections :any
  
  currentQues : any
  answers = []
  wrongCount  = 0;
  correctCount = 0;
  counter = 0 
  currenSection : any
  last = false
 dis = false
  constructor( public db : AngularFireDatabase) {
    this.sections = this.db.list("sections").valueChanges()
   }

  ngOnInit() {
  }

  startSection(section : any){

    this.answers = []
    this.wrongCount = 0;
    this.correctCount =0;
    this.counter = 0 

    this.currenSection = section
    this.currentQues = section.questions[this.counter]

 
    if(section.questions[this.counter+1] === undefined)
    {
      this.last = true
    }
     this.counter++

  }

  saveAnswer(ans : string,ques:any){


    if(this.currenSection.questions[this.counter-1] !== undefined)
    {
      
    
 
    if(ans === ques.correctAnswer )
    {
      this.correctCount ++
    }
    else{
      this.wrongCount ++
    }
    this.answers.push({ans, ques, correct : ans === ques.correctAnswer })

    this.nextQuestion()
  }

  }

  nextQuestion(){

    this.currentQues =  this.currenSection.questions[this.counter]
   
    if(this.currenSection.questions[this.counter+1] === undefined)
    {
      this.last = true
    }
    this.counter++

  }

  saveSection(){
    let rate = Math.round((this.correctCount /(this.correctCount + this.wrongCount)) * 100)
    let data = {
      answers : this.answers,
      correctCount : this.correctCount,
      wrongCount : this.wrongCount,
      section : this.currenSection,
      uid : JSON.parse(localStorage.getItem("user")).uid,
      questionCount : this.correctCount + this.wrongCount,
      successRate : rate,
      isSuccess :  rate > 50
    }

    //reset


  this.answers = []
  this.wrongCount = 0;
  this.correctCount =0;
  this.counter = 0 

  this.db.list("answers").push(data)

  }

}
