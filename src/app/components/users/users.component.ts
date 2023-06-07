import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseDatabase } from 'angularfire2';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/domain/user-data';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: UserData[];
  myEmail: string;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().valueChanges().subscribe(result => {
      this.myEmail = this.authService.getUserEmail();
      this.users = result.filter(user => user.email !== this.myEmail);
    });
  }

  logout() {
    this.authService.logout();
  }

}
