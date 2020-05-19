import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient, private storage: Storage) { }

  group_id = "1";
  url = "http://localhost/onpointchat-BE";
  
  loadGroups(){
    return this.http.get(`${this.url}/groups`);
  }

  setGroupId(group_id){
    this.group_id = group_id;
  }

  getGroupId(){
    return this.group_id;
  }

  storeId(){
    var groupId = this.getGroupId();
    this.storage.set('group', groupId);
  }

  deleteStoredGroup(){
    this.storage.clear();
  }

  checkStg(){
    this.storage.get('group').then((id)=>
    {
      if(id !== null)
      {
        this.setGroupId(id);
      }
      else
      {
        this.setGroupId("1");
      }
    });
  }

  addGroup(group){
    return this.http.post(`${this.url}/group`,group);
  }
  getMessageCount(){
    return this.http.get(`${this.url}/messagecount`)
  }
}
