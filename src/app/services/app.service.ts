import { environment } from './../../environments/environment';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../components/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  @Output() showMobileNav = new EventEmitter<boolean>();
  @Output() messageAlert = new EventEmitter<any>();

  public environmentName: string = environment.production ? 'Production' : 'Dev';
  public API_LINK: string = environment.api;
  // try to get token from localstorage on init, if alredy logged in
  public token: string = localStorage.getItem('token'); 

  // used for project-form
  public selectedProject: any;

  public httpOptions;
  
  public showLoading: boolean = false;

  constructor(private router: Router, public http: HttpClient, private modalService: NgbModal) { 
    this.token = this.getLocalToken();
    if(this.token) this.setupHeaders(this.token);
  }

  getLocalToken() {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const jwt = new JwtHelperService();
    return !jwt.isTokenExpired(this.getLocalToken());
  }

  public getUserId() {
    const jwt = new JwtHelperService();
    return jwt.decodeToken(this.getLocalToken());
  }

  navigate(route) {
    this.showLoading = false;
    this.router.navigate([route]);
  }

  childNavigate(route, outlet, child) {
    this.showLoading = false;
    this.router.navigate([`/${route}`, { outlets: { [outlet]: [child] } }]);
  }

  getEnvironment(): string {
    return this.environmentName;
  }

  register(user) {
    return this.http.post(`${this.API_LINK}/users/register`, user);
  }

  login(credentials) {
    return this.http.post(`${this.API_LINK}/users/login`, credentials);
  }

  setupHeaders(token) {
    this.httpOptions= { 
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    }
  }

  getCurrentUser() {
    return this.http.get(`${this.API_LINK}/users/current`, this.httpOptions);
  }

  logout() {
    return this.http.post(`${this.API_LINK}/users/logout`, { token: this.token });
  }

  // id is optional argument
  getProjects(id?) {
    const link = id ? `${this.API_LINK}/projects/${id}` : `${this.API_LINK}/projects`
    return this.http.get(link, this.httpOptions);
  }

  addProject(project) {
    return this.http.post(`${this.API_LINK}/projects`, project, this.httpOptions);
  }

  updateProject(project) {
    return this.http.put( `${this.API_LINK}/projects`, project, this.httpOptions);
  }

  deleteProject(id) {
    return this.http.delete( `${this.API_LINK}/projects/${id}`, this.httpOptions);
  }

  searchProject(fields) {
    return this.http.post( `${this.API_LINK}/projects/search`, fields, this.httpOptions);
  }

  parseDate(date) {
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ')
  }

  // showConfirmMessage(title: string, message: string, callback: any, inputParams?: any) {
  //   const modalRef = this.modalService.open(ConfirmComponent)
  //   modalRef.componentInstance.title = title;
  //   modalRef.componentInstance.message = message;
  //   modalRef.result.then(data => {
  //     if(data == 'ok') callback(inputParams)
  //   })
  // }

  showConfirmMessagePromise(title: string, message: string) {
    const modalRef = this.modalService.open(ConfirmComponent)
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    return modalRef.result
  }


}
