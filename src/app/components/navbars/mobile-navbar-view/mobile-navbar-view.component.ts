import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-mobile-navbar-view',
  templateUrl: './mobile-navbar-view.component.html',
  styleUrls: ['./mobile-navbar-view.component.scss']
})
export class MobileNavbarViewComponent implements OnInit {
  public show = false;

  constructor(public app: AppService) {
    this.app.showMobileNav.subscribe(bool => (this.show = bool));
  }

  ngOnInit() {}

  hide() {
    this.show = false;
  }

  logout() {
    localStorage.removeItem('token');
    this.app.logout();
    this.app.navigate('login');
  }

}
