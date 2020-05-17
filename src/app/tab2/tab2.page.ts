import { Component, ViewChild } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { UserService } from "../services/user.service";
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  groups = [];

  @ViewChild('content',{static: false}) private content: any;


  constructor(private navController: NavController, 
    private router: Router,private GroupsService: GroupsService,
    private userService: UserService) {}

  
  ionViewWillEnter()
  {
    this.loadGroups();
  }

  loadGroups(){
    this.GroupsService.loadGroups().subscribe(groups => {

      this.groups = groups as any;
      this.GroupsService.getMessageCount().subscribe(groups2 => {
        for(let i = 0; i<this.groups.length; i++)
        {
          if(this.groups[i].id == groups2[i].id)
          {
            this.groups[i].msgCount = groups2[i].messages[0].count;
          }
        }
        console.log(this.groups);
      });
    });
  }

  enterGroupChat(group_id){
    this.GroupsService.setGroupId(group_id);
    this.GroupsService.storeId();
    this.navController.navigateRoot('/tabs/tab1');
  }
  logout(){
    this.userService.deleteId();
    this.navController.navigateRoot('/start')
  }
  addRoom(){
    this.navController.navigateRoot('/add-room')
  }
}
