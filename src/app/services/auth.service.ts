import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$!: Observable<User | null | undefined>;
  userId!: string | undefined;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {  }

  loggedIn!:boolean;


  async checkLoggedIn():  Promise<boolean> {
    const user = await this.afAuth.currentUser;
    const isAuthenticated = user ? true : false;
    return isAuthenticated; 
  }

  async updateLoggedIn() {
    const user = await this.afAuth.currentUser;
    const isAuthenticated = user? true: false;
    this.loggedIn = isAuthenticated;
    if(this.loggedIn) {
      this.userId = user?.uid;
    }
  }

  getUserId() {
    if (this.userId !== undefined) {
      return this.userId;
    }
    else {
      return '';
    }
  }

  async googleSignin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.signInWithPopup(provider);
      await this.updateLoggedIn();
      this.router.navigate(['/courses']);
      // this.updateUserData(/** credential.user **/);
    } catch (e) {
      alert('Error during Google sign in. Try again later or sign up with email.');
    }
  }

  async emailSignin(email:string, pass:string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, pass);
      await this.updateLoggedIn();
      this.router.navigate(['/courses']);
      // this.updateUserData(/** credential.user **/); 
    } catch (e) {
      alert('Error during sign in. Email or password incorrect.');
    }
  }

  async registerEmail(email:string, pass:string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, pass);
      await this.updateLoggedIn();
      this.router.navigate(['/courses']);
      // this.updateUserData(/** credential.user **/);
    } catch (e) {
      alert('Error registering new user. Please ensure that you are using a valid email. Also ensure your passwords match, are at least 6 characters in length, and use only valid characters.');
    }
  }


  updateUserData(/** user:any **/) {
    // Sets user data to firestore on login
    /** const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL
    };


    return userRef.set(data, { merge: true }); **/
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/']);
      await this.updateLoggedIn();
    } catch (e) {
      alert('Error signing user out. Please try again.');
    }
  }
}
