import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
    user_id: ""
  };

  constructor(private navController: NavController,
    private groupsService: GroupsService,
    private userService: UserService) { }

  ngOnInit() {
  }

  goBack(){
    this.navController.navigateRoot('/tabs/tab2')
  }

  addGroup(){
    this.newGroup.user_id = this.userService.getUserId();
    this.groupsService.addGroup(this.newGroup).subscribe(()=>{
      this.navController.navigateRoot('/tabs/tab2');
    });
    
  }
}
