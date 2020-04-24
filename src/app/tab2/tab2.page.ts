import { Component } from '@angular/core';
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

  constructor(private navController: NavController, 
    private router: Router,private GroupsService: GroupsService,
    private userService: UserService) {}
  ngOnInit() {
    this.loadGroups();
  } 

  loadGroups(){
    this.GroupsService.loadGroups().subscribe(groups => {

      this.groups = groups as any;
      console.log(this.groups);
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
}
