import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoundListItem } from 'src/app/models/RoundListItem';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { CourseListItem } from 'src/app/models/CourseListItem';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-hcp',
  templateUrl: './hcp.component.html',
  styleUrls: ['./hcp.component.css']
})
export class HCPComponent implements OnInit, OnDestroy {
  coursesSubscription!:Subscription;
  roundsSubscription!:Subscription;
  constructor(public dataService: DataService, private auth: AuthService) {
  }
  roundScore!:number;
  courseID!:string;

  rounds:RoundListItem[] = [];
  courses:CourseListItem[] = [];

  hcp!:Promise<string | number>;

  ngOnInit(): void {
    this.coursesSubscription = this.dataService.getCourses().subscribe((fireCourses) => {
      this.courses = fireCourses.filter((v, i) => v.userID === this.auth.getUserId());
    })
    this.roundsSubscription = this.dataService.getRounds().subscribe((fireRounds) => {
      this.rounds = fireRounds.filter((v,i) => v.userID === this.auth.getUserId());
      this.hcp = this.calculateHandicap();
    })
  }

  async addRound() { 
    try{
      let courseName!:string;
      let slopeRating!:number;
      let courseRating!:number;
      let courseID!:string;

      console.log('number of courses:', this.courses.length);

      if (this.courses.length === 1) {
        courseName = this.courses[0].name;
        courseRating = this.courses[0].rating;
        slopeRating = this.courses[0].slope;
        courseID = this.courses[0].id;
      }
      else {
        courseName = (await this.dataService.courseInfo(this.courseID))?.['name'];
        courseRating = (await this.dataService.courseInfo(this.courseID))?.['rating'];
        slopeRating = (await this.dataService.courseInfo(this.courseID))?.['slope'];
        courseID = this.courseID;
      }
        
      if (isNaN(this.roundScore)) {
        throw 'Round score is not a number.';
      }
      this.dataService.addRound(courseID, courseName, courseRating, slopeRating, this.roundScore, this.auth.getUserId());
    } catch (e) {
      alert('Error adding round. Please make sure that score is a valid number and you have selected a course. Input courses on "Courses" page at bottom of screen.')
    }
  }

  courseInfo(id:string) {
    for (var course of this.courses) {
      if (id === course.id) {
        return course;
      }
    }

    return null;
  }

  async calculateHandicap () {   
    const differentials = await this.getDifferentials();
    differentials.sort(function(a, b){return a-b});

    let n:number = this.rounds.length;
    if (n < 3) {
      return "Input Rounds Below"
    }  
    
    if (n == 3) {
      let hcp:number = parseFloat((differentials[0] - 2).toFixed(1));
      if (hcp < 0) {
        return "+" + Math.abs(hcp);
      }

      return hcp;
    }
    else if (n == 4) {
      let hcp:number = parseFloat((differentials[0] - 1).toFixed(1));
      if (hcp < 0) {
        return "+" + Math.abs(hcp);
      }
      return hcp;
    }
    else if (n == 5) {
      let hcp:number = parseFloat((differentials[0]).toFixed(1));
      if (hcp < 0) {
        return "+" + Math.abs(hcp);
      }
      return hcp;
    }
    else if (n == 6) {
      let hcp:number = parseFloat(((differentials[0] + differentials[1]) / 2).toFixed(1)) - 1;
      if (hcp < 0) {
        return "+" + Math.abs(hcp);
      }
      return hcp;
    }
    else if (n == 7 || n == 8) {
      let hcp:number = parseFloat(((differentials[0] + differentials[1]) / 2).toFixed(1));
      if (hcp < 0) {
        return "+" + Math.abs(hcp);
      }
      return hcp;
    }
    else if (n >= 9 && n <= 11) {
      let sum!:number;
      for(let i=0; i < 3; i++){
        sum = sum + differentials[i];
      }

      let hcp:number = parseFloat((sum / 3).toFixed(1));
      if (hcp < 0) {
        return "+" + Math.abs(hcp);
      }
      return hcp;
    }
    else if (n >= 12 && n <= 14) {
      let sum!:number;
      for(let i=0; i < 4; i++){
        sum = sum + differentials[i];
      }

      let hcp:number = parseFloat((sum / 4).toFixed(1));
      if (hcp < 0) {
        return "+" + Math.abs(hcp);
      }
      return hcp;
    }
    else if (n == 15 || n == 16) {
      let sum!:number;
      for(let i=0; i < 5; i++){
        sum = sum + differentials[i];
      }

      let hcp:number = parseFloat((sum / 5).toFixed(1));
      if (hcp < 0) {
        return "+" + Math.abs(hcp);
      }
      return hcp;
    }
    else if (n == 17 || n == 18) {
      let sum!:number;
      for(let i=0; i < 6; i++){
        sum = sum + differentials[i];
      }

      let hcp:number = parseFloat((sum / 6).toFixed(1));
      if (hcp < 0) {
        return "+" + Math.abs(hcp);
      }
      return hcp;
    }
    else if (n == 19) {
      let sum!:number;
      for(let i=0; i < 7; i++){
        sum = sum + differentials[i];
      }

      let hcp:number = parseFloat((sum / 7).toFixed(1));
      if (hcp < 0) {
        return "+" + Math.abs(hcp);
      }
      return hcp;
    }
    else {
      let sum!:number;
      for(let i=0; i < 8; i++){
        sum = sum + differentials[i];
      }

      let hcp:number = parseFloat((sum / 8).toFixed(1));
      if (hcp < 0) {
        return "+" + Math.abs(hcp);
      }
      return hcp;
    }
  } 

  async getDifferentials () {
    let diffs:number[] = [];
    for (var round of this.rounds) {
      let d!:number;
      d = (round.score - round.courseRating) * (113/round.slopeRating);
      diffs.push(d);
    }

    return diffs;
  }

  ngOnDestroy() {
    this.roundsSubscription.unsubscribe();
    this.coursesSubscription.unsubscribe();
  }
}
