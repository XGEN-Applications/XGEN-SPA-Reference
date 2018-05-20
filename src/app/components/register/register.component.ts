import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public user = {
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  }
  constructor(public app: AppService) { }

  ngOnInit() {
  }

  register() {
    this.app.showLoading = true;
    // call register API using metod from AppService (returns observable)
    this.app.register(this.user).subscribe(result => {
      let message;

      // create message based on server response
      if(result['statusCode'] == 200) {
        message = { alert: 'info', message: JSON.parse(result['body'])};
        this.app.showLoading = false;
        this.app.navigate('login');
      } else {
        message = { alert: 'error', message: JSON.parse(result['body'])}
      }

      this.app.showLoading = false;
      this.app.messageAlert.emit(message);
      
    }, err => {
      this.app.messageAlert.emit({ alert: 'error', message: 'server error' });
      this.app.showLoading = false;
    });
  }

}
