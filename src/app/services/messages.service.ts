import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  url = "/onpointchat-BE";


  loadMessages(group_id){
    return this.http.get(`${this.url}/messages/${group_id}`);
  }

  sendMessage(message)
  {
    return this.http.post(`${this.url}/message`,message);
  }
}
