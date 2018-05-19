import { AlertMessagesComponent } from './../alert-messages/alert-messages.component';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public credentials = {
    username: '',
    password: ''
  };

  constructor(public app: AppService) { }

  ngOnInit() {
  }

  login() {
    this.app.login(this.credentials).subscribe(result => {
      if(result['statusCode'] == 200) {
        // login success, save token to service and local storage
        const { token } = JSON.parse(result['body']);
        localStorage.setItem('token', token);
        this.app.token = token;
        this.app.navigate('home');
      } else {
        // login failed TODO: Show message
        this.app.messageAlert.emit({ alert: 'Error', message: 'Login failed!'});
      }
    }, err => console.log('eee', err));
  }

}
