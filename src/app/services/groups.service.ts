import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  group_id = "1";
  url = "http://localhost:8000";
  loadGroups(){
    return this.http.get(`${this.url}/groups`);
  }

  setGroupId(group_id){
    this.group_id = group_id;
  }

  getGroupId(){
    return this.group_id;
  }

  addGroup(groupname){
    return this.http.post(`${this.url}/group`,{name: groupname});
  }
}
