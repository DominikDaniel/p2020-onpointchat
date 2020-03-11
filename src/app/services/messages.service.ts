import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  loadMessages(){
    return this.http.get("http://localhost:8000/messages");
  }

  sendMessage(message)
  {
    return this.http.post("http://localhost:8000/message",message);
  }
}
