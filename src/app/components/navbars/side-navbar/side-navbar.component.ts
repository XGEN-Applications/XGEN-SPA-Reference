import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {
  constructor(public app: AppService) {}

  ngOnInit() {}

  logout() {
    localStorage.removeItem('token');
    this.app.logout();
    this.app.navigate('login');
  }

}
