import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UserData } from 'src/app/domain/user-data';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFireDatabase) {
    
  }

  processMessage(newMessage: ChatMessage, userEmail: string, myEmail: string) {
    let currentMessageList:AngularFireList<ChatMessage> = 
        this.db.list(this.getCollectionName(userEmail, myEmail));

    newMessage.email = myEmail;
    newMessage.sendingDate = this.getCurrentTimestamp();

    currentMessageList.push(newMessage);

  }

  getMessages(userEmail: string, myEmail: string): AngularFireList<ChatMessage> {
    return this.db.list(this.getCollectionName(userEmail, myEmail));
  }

  getUserInformation(userEmail: string): AngularFireList<UserData> {
      return this.db.list('users', ref => ref.orderByChild('email').equalTo(userEmail).limitToFirst(1));
  }


  getCollectionName(userEmail: string, myEmail: string): string {
     let myFilteredEmailId = myEmail.replace('.', '');
     let userFilteredEmailId = userEmail.replace('.', '');
     return myFilteredEmailId > userFilteredEmailId ? 
     userFilteredEmailId.concat('-', myFilteredEmailId) : myFilteredEmailId.concat('-', userFilteredEmailId);
  }

  getCurrentTimestamp(): number {
    return new Date().getTime();
  }

}