import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public app: AppService) {}

  ngOnInit() {}

  showMobileNav() {
    this.app.showMobileNav.emit(true);
  }

}
