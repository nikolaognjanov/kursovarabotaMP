import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/domain/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  signUpForm: FormGroup;

  isSignInActive: number = 1;

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    })

    this.signUpForm = this.formBuilder.group({
      'username': ['', [Validators.required]],
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]],
      'passwordConfirm': ['', [Validators.required]]
    });
  }

  signIn() {
    this.authService.signIn(this.signInForm.value);
  }

  signUp() {
    if(this.signUpForm.invalid) {
      if(this.signUpForm.controls['email'].invalid) {
        this.toastr.warning('Please enter correct email', '');
      } else {
        this.toastr.warning('Please fill all fields', '');
      }
    } else {
      let user: User = this.signUpForm.value;
      if(user.password !== user.passwordConfirm) {
        this.toastr.warning('Password confirm not matching', '');
      } else {
        this.authService.signUp(user);
      }
    }
  }

  changeForm(formNum: number) {
    this.isSignInActive = formNum;
  }

}
