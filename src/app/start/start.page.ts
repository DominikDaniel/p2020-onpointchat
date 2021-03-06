import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
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

  constructor(public alertController: AlertController,
    private navController: NavController, 
    private router: Router,
    private userService: UserService,
    private messagesService: MessagesService) {}

  nickname = "";
  
  ngOnInit(){
    this.userService.skipStart();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Musíte si nastaviť meno pred vstúpením do chatu!',
      buttons: ['OK']
    });

    await alert.present();
  }

  login() {
      var temp = this.nickname.replace(/\s/g, "");
      if(temp == ""){
        this.presentAlert()
      }
      else{
          this.userService.create(this.nickname).subscribe(userId =>{
          this.userService.setUserId(userId);
          this.userService.storeId();
          this.navController.navigateRoot('/tabs/tab1');
        });
      }
    }
}

