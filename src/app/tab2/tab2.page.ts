import { Component } from '@angular/core';
import { UserService } from "../services/user.service";
import { MessagesService } from "../services/messages.service";
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  group_id;
  messages = [];
  users = [];
  newMessage = {
    user_id: "",
    group_id: "",
    message: ""
  };

  constructor(private userService: UserService,
    private messagesService: MessagesService,private groupsService: GroupsService) {}
    
  ngOnInit() {
    this.loadMessages();
  }

  ionViewWillEnter(){
    this.loadMessages();
  }
  loadMessages(){ 
    this.group_id = this.groupsService.getGroupId();
    this.userService.getUserList().subscribe(users => {
      this.users = users as any;
      //console.log(this.users);
    });
    console.log(this.group_id);
    this.messagesService.loadMessages(this.group_id).subscribe(messages => {
      this.messages = messages as any;
      //console.log(messages);
      for(let i = 0; i<this.messages.length;i++)
      {
        for(let j = 0; j<this.users.length;j++)
        {
          if(this.messages[i].user_id == this.users[j].id)
          {
            this.messages[i].user_id = this.users[j].name;
          }
        }
      }
    });
  }

  sendMessage()
  {
    this.newMessage.user_id = this.userService.getUserId();
    this.newMessage.group_id = this.group_id;
    this.messagesService.sendMessage(this.newMessage).subscribe(()=>{
      this.loadMessages();
    });
    this.newMessage = {
      user_id: "",
      group_id: "",
      message: ""
    };
  }

}
