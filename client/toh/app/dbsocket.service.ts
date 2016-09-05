import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { ISocketItem } from "./socket-item.interface";
import { Hero } from "./hero";

@Injectable()
export class DBSocketService {
  private url = 'http://localhost:3333';
  private name: string;
  private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
  private socket: SocketIOClient.Socket = io(this.url);
  /**
   * Constructor.
   *
   * @class SocketService
   * @constructor
   */
  constructor() { console.log("SOCKET SERVICE CONNECT WITH: ", this.host);}
  /**
   * Get items observable
   *
   * @class SocketService
   * @method get
   * @param name string
   * @return Observable<any>
   */

  get(name: string): Observable<any> {
    this.name = name;
    let socketUrl = this.host + "/" + this.name;
    console.log("SOCKET URL IS:", socketUrl);
    this.socket = io.connect(socketUrl);
    this.socket.on("connect", () => this.connect());
    this.socket.on("disconnect", () => this.disconnect());
    this.socket.on("info", (info: string) => {
      console.log(`INFO: "${info}" (${socketUrl})`);
    });
    this.socket.on("error", (error: string) => {
      console.log(`ERROR: "${error}" (${socketUrl})`);
    });

    // Return observable which follows "create" and "remove" signals from socket stream
    return Observable.create((observer: any) => {
      this.socket.on("create", (item: any) => observer.next({ action: "create", item: item }));
      this.socket.on("remove", (item: any) => observer.next({ action: "remove", item: item }));
      return () => this.socket.close();
    });
  }

  /**
   * Create signal
   *
   * @class SocketService
   * @method create
   * @param name string
   * @return void
   */
  create(name: string) {
    this.socket.emit("create", name);
  }

  /**
   * Remove signal
   *
   * @class SocketService
   * @method remove
   * @param name string
   * @return void
   */
  remove(name: string) {
    this.socket.emit("remove", name);
  }


  sendMessage(message) {
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

  /**
  * Handle connection opening
  *
  * @class SocketService
  * @method connect
  * @return void
  */
  private connect() {
    console.log(`Connected to "${this.name}"`);

    // Request initial list when connected
    this.socket.emit("list");
  }

  /**
   * Handle connection closing
   *
   * @class SocketService
   * @method disconnect
   * @return void
   */
  private disconnect() {
    console.log(`Disconnected from "${this.name}"`);
  }
}