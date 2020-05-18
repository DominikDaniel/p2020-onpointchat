import { Component, OnInit } from '@angular/core';
import { NavController, AlertController  } from '@ionic/angular';
import { GroupsService } from '../services/groups.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.page.html',
  styleUrls: ['./add-room.page.scss'],
})
export class AddRoomPage implements OnInit {

  newGroup = {
    name: "",
    user_id: "",
    code: ''
  };

  constructor(public alertController: AlertController,
    private navController: NavController,
    private groupsService: GroupsService,
    private userService: UserService) { }

  ngOnInit() {
  }

  goBack(){
    this.navController.navigateRoot('/tabs/tab2')
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Názov miestnosti nemôže ostať prázdny a nemôže sa volať broadcast a kód musí mať 4 čísla!',
      buttons: ['OK']
    });

    await alert.present();
  }

  addGroup(){
    this.newGroup.user_id = this.userService.getUserId();
    if(this.newGroup.name.trim().length == 0 
    || this.newGroup.code.toString().length !== 4 
    || this.newGroup.name.trim() =="Broadcast"){
      this.presentAlert();
    }
    else{
      this.groupsService.addGroup(this.newGroup).subscribe(()=>{
        this.newGroup = {
          name: "",
          user_id: "",
          code: ''
        };
        this.navController.navigateRoot('/tabs/tab2');
      });
    }
  }

  logout(){
    this.userService.deleteId();
    this.navController.navigateRoot('/start')
  }
}
