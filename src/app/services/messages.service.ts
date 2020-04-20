import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  loadMessages(group_id){
    return this.http.get(`/onpointchat-BE//messages/${group_id}`);
  }

  sendMessage(message)
  {
    return this.http.post("/onpointchat-BE/message",message);
  }
}
