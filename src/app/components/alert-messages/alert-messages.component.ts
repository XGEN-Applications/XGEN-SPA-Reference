import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.scss']
})
export class AlertMessagesComponent implements OnInit {

  public alerts = {
    success: false,
    error: false,
    info: false
  };

  public message: string = ''

  constructor(public appService: AppService) {
    this.appService.messageAlert.subscribe(data => {
      this.showAlert(data.alert, data.message)
    }, err => console.log(err));
  }

  ngOnInit() {
  }

  showAlert(alert, message) {
    this.alerts[alert] = true;
    this.message = message;
    setTimeout(() => {
      this.alerts[alert] = false;
      this.message = '';
    }, 2500);
  }

  hideAlert(alert) {
    this.alerts[alert] = false
    if (this.message) this.message = '';
  }
}

