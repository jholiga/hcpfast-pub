import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseListItem } from 'src/app/models/CourseListItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
  
  subscription!:Subscription;
  constructor(public dataService: DataService, private auth: AuthService) { }

  course!:string;
  courseRating!:number;
  slopeRating!:number;
  courses!:CourseListItem[];


  ngOnInit(): void {
    this.subscription = this.dataService.getCourses().subscribe((courses) => {
      this.courses = courses.filter((v,i) => v.userID === this.auth.getUserId());
    })
  }

  addCourse() {
    try {
      if(isNaN(this.courseRating) || isNaN(this.slopeRating)){
        throw 'Input course or slope rating is not a number.';
      }
      this.dataService.addCourse(this.course, this.courseRating, this.slopeRating);
    } catch(e) {
      alert('Error adding course. Ensure course and slope ratings are valid numbers, and try again.');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
