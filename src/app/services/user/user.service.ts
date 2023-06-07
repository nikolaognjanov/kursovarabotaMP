import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../auth/auth.service';
import { UserData } from 'src/app/domain/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  getAllUsers():AngularFireList<UserData> {
    return this.db.list('users');
  }
}
