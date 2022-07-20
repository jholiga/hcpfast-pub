import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseListItem } from '../models/CourseListItem';
import { Firestore, collectionData, collection, doc, getDoc, firestoreInstance$ } from '@angular/fire/firestore';
import { ulid } from 'ulid';
import { RoundListItem } from '../models/RoundListItem';
import { setDoc, deleteDoc } from 'firebase/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  courses$: Observable<CourseListItem[]>;
  rounds$: Observable<RoundListItem[]>;
  constructor(private firestore: Firestore, private auth: AuthService) {
    const courses = collection(firestore, 'courses');
    this.courses$ = collectionData(courses) as Observable<CourseListItem[]>;
    const rounds = collection(firestore, 'rounds');
    this.rounds$ = collectionData(rounds) as Observable<RoundListItem[]>;
  }

  getCourses():Observable<CourseListItem[]> {
    return this.courses$;
  }

  addCourse(courseName:string, courseRating:number, slopeRating:number) {
    let uuid = ulid();
    setDoc(doc(collection(this.firestore, 'courses'), uuid), {
      id: uuid,
      name: courseName,
      rating: courseRating,
      slope: slopeRating,
      userID: this.auth.getUserId()
    });
  }

  async deleteCourse(courseID:string) {
    await deleteDoc(doc(this.firestore, "courses", courseID));
  }

  async deleteRound(roundID:string) {
    await deleteDoc(doc(this.firestore, "rounds", roundID));
  }

  async courseInfo(id:string) {
    const docRef = doc(this.firestore, 'courses', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  getRounds():Observable<RoundListItem[]> {
    return this.rounds$;
  }

  addRound(courseID:string, courseName:string, courseRating:number, slopeRating:number, roundScore:number, userID:string) {
    const uuid = ulid();
    setDoc(doc(collection(this.firestore, 'rounds'), uuid), {
      id: uuid,
      courseID: courseID,
      courseName: courseName,
      courseRating: courseRating,
      slopeRating: slopeRating,
      score: roundScore,
      userID: this.auth.getUserId()
    });
  }
}
