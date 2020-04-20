import { Component, ViewChild } from '@angular/core';
import { UserService } from "../services/user.service";
import { MessagesService } from "../services/messages.service";
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from '../services/groups.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  groups = [];
  group_id;
  group_name;
  messages = [];
  users = [];
  newMessage = {
    user_id: "",
    group_id: "",
    message: ""
  };
  isDisabled = true;

  constructor(private navController: NavController,private userService: UserService,
    private messagesService: MessagesService,private groupsService: GroupsService) {}

  ionViewWillEnter(){
    this.loadMessages();
  }
  loadMessages(){ 
    this.group_id = this.groupsService.getGroupId();
    this.getGroupName()
    this.userService.getUserList().subscribe(users => {
      this.users = users as any;
    });
    var myId = this.userService.getUserId();
    this.messagesService.loadMessages(this.group_id).subscribe(messages => {
      this.messages = messages as any;
      for(let i = 0; i<this.messages.length;i++)
      {
        if(this.messages[i].user_id == myId)
        {
          this.messages[i].isMyMsg = true;
        }
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

  getGroupName(){
    this.groupsService.loadGroups().subscribe(groups => {
      this.groups = groups as any;
          for (let i = 0; i < this.groups.length; i++) {
      if( this.group_id == this.groups[i].id){
        this.group_name = this.groups[i].name;
      }
    }
    });
  }

  sendMessage(){
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

  goBack(){
    this.navController.navigateRoot('/tabs/tab1');
  }

  doRefresh(event){
    this.loadMessages();
    setTimeout(function(){
      event.target.complete();
    },1000)
  }

  checkInput(){
    if (this.newMessage.message.trim().length == 0){
      console.log(this.newMessage.message.trim().length)
      this.isDisabled = true;
    }else{
      this.isDisabled = false;
    }
  }
}
