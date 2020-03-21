import { Component } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  users = [];
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.loadUsers();
  } 

  loadUsers(){
    this.userService.getUserList().subscribe(users => {
      this.users = users as any;
      console.log(this.users);
    });
  }
}
