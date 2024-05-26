import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

Header={}

  constructor(private http:HttpClient) {
    this.Header={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })}
  }


//Get All Chat

getAllChat():Observable<any>{
  return this.http.get<any>(`http://localhost:3000/getUnansweredPrescriptions`);
}

//Cancel Chat
cancelChat(id:number):Observable<any>{
  return this.http.delete<any>(`http://localhost:3000/chat/${id}`);
}

//Send Chat
sendChat(chat:any):Observable<any>{
  return this.http.post<any>(`http://localhost:3000/chat`,chat,this.Header);
}

}


