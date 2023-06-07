import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from '../../domain/user';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, 
    public router: Router, private toastr: ToastrService) {
      
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async signIn(userCredentials: UserCredentils) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(userCredentials.email, userCredentials.password)
      this.router.navigateByUrl('users');
    } catch (e) {
      this.toastr.warning(e.message, '');
    }
  }

  async signUp(user: User) {
    try {
      await this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password);
      this.db.list('users').push({
        'email': user.email,
        'username': user.username,
        'firstName': user.firstName,
        'lastName': user.lastName
      })
      this.router.navigateByUrl('users');
    } catch (e) {
      this.toastr.warning(e.message, '');
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigateByUrl('login');
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  getUserEmail() {
    return JSON.parse(localStorage.getItem('user')).email;
  }
}
