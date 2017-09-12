import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import * as io from 'socket.io-client';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  ws: any;

  showNameInput = true;
  showChatScreen = false;

  messageLog = '';
  userName = '';

  serverURL = 'ws://localhost:7007';

  constructor(public navCtrl: NavController) {
  }

  toggleScreens = () => {
    this.showNameInput = !this.showNameInput;
    this.showChatScreen = !this.showChatScreen;
  };

  connect = () => {
    this.ws = new WebSocket(this.serverURL, []);

    this.ws.onmessage = this.handleMessageReceived;

    this.ws.onopen = this.handleConnected;

    this.ws.onerror = HomePage.handleError;

    // this.ws.logMessage = this.logMessage;
    //
    // this.ws.updateScrolling = this.updateScrolling;
  };

  handleMessageReceived = (data) => {
    this.logMessage(data.data);
  };

  logMessage = (message) => {
    this.messageLog = this.messageLog + message + '\n';
    this.updateScrolling();
  };

  updateScrolling = () => {
    // let
    let msgLogId = '#messageLog';
    // console.log('Message log: ' + this.messageLog);
    let msgLog = '';
  };

  handleConnected = (data) => {
    let logMsg = 'Connected to server: ' + data.target.url;
    this.logMessage(logMsg);
  };

  static handleError = (err) => {
    console.log('Error: ' + JSON.stringify(err));
  };

  submitName = (name) => {
    if (!name) {
      return
    }
    this.userName = name;

    this.connect();

    this.toggleScreens();
  };

  sendMessage = (msg) => {
    let nameAndMsg = this.userName + ': ' + msg;
    this.ws.send(nameAndMsg);
  };

  // send(msg) {
  //   if (msg != '') {
  //     this.socket.emit('message', msg);
  //   }
  //   this.chat_input = '';
  // }

}
