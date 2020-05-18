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
  deleteCode;

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

  showDelete(i){
    this.groups[i].deleteActive = true;
  }

  cancelDelete(i){
    this.groups[i].deleteActive = false;
    this.deleteCode = '';
  }

  deleteRoom(id){
    this.GroupsService.deleteGroup(id,this.deleteCode).subscribe(()=>{
      this.deleteCode = '';
      this.GroupsService.setGroupId("1");
      this.loadGroups();
    });
  }
}
