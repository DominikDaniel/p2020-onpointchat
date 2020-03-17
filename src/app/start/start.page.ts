import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from "../services/user.service";
import { MessagesService } from "../services/messages.service";
import { error } from 'util';


@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage {

  constructor(private navController: NavController, 
    private router: Router,
    private userService: UserService,
    private messagesService: MessagesService) {}

  nickname = "";

  login()
    {
      var temp = this.nickname.replace(/\s/g, "");
      if(temp == "")
      {
        console.error();
      }
      else if(temp !== "")
      {
        this.userService.create(this.nickname).subscribe(userId =>{
          this.userService.setUserId(userId);
          this.navController.navigateRoot('/tabs/tab2');
        });
      }
    }
}

