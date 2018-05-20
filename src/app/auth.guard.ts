import { AppService } from './services/app.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    public app: AppService
  ) { }

  canActivate(): boolean {
    if (!this.app.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}