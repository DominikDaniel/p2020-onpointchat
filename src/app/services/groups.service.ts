import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  group_id = "1";

  loadGroups(){
    return this.http.get("http://localhost/onpointchat-BE/groups");
  }

  setGroupId(group_id){
    this.group_id = group_id;
  }

  getGroupId(){
    return this.group_id;
  }
}