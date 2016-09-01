import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class DBSocketService {
  private url = 'http://localhost:3000';  
  private socket;
  
  sendMessage(message){
    this.socket.emit('add-message', message);    
  }
  
  onSave() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('save', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  
  onDelete() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('remove', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  
}