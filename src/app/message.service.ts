import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(this.getTime() + ':: ' + message);
  }

  clear() {
    this.messages = [];
  }

  getTime() {
    const d = new Date();
    let seconds = this.addZero(d.getSeconds());
    let minutes = this.addZero(d.getMinutes());
    let hours = this.addZero(d.getHours());

    return hours + ':' + minutes + ':' +seconds
  }

  addZero( i:number) {
    let retval: String;
    if (i < 10) {
      retval = '0' + i.toString() }
    else {
      retval = i.toString() }
    return retval;
  }

}

