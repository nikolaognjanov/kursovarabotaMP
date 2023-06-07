import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserData } from 'src/app/domain/user-data';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scroller') private messageContainer: ElementRef;

  messages: ChatMessage[];
  user: UserData;

  userEmail: string;
  myEmail: string;
  userLabel: string;
  
  newMessageForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private chatService: ChatService,
    private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.userEmail = this.router.url.split('/').pop();
    this.myEmail = this.authService.getUserEmail();

    this.chatService.getUserInformation(this.userEmail).valueChanges().subscribe(result => {
      this.user = result[0];
      this.userLabel = this.user.firstName.concat(' ', this.user.lastName);
    })

    this.newMessageForm = this.formBuilder.group({
      message: ''
    });

    this.chatService.getMessages(this.userEmail, this.myEmail).valueChanges().subscribe(result => {
      this.messages = result.map(message => {
        let sendingDate = new Date(message.sendingDate);
        return message;
      })
    })
  }

  ngAfterViewChecked() {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }

  logout() {
    this.authService.logout();
  }

  sendMessage() {
    if (this.newMessageForm.value.message) {
      let newMessageValue = this.newMessageForm.value.message.trim();
      if (newMessageValue !== '') {
        this.chatService.processMessage(this.newMessageForm.value, this.userEmail, this.myEmail);
      }
    }
    this.newMessageForm.reset();
  }

  sendFromKeyboard(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

}
