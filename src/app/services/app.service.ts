import { environment } from './../../environments/environment';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.token
    })
  };
  
  public showLoading: boolean = false;

  constructor(private router: Router, public http: HttpClient) { }

  navigate(route) {
    this.router.navigate([route]);
  }

  childNavigate(route, outlet, child) {
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

  getCurrentUser() {
    return this.http.get(`${this.API_LINK}/users/current`, this.httpOptions);
  }

  logout() {
    return this.http.post(`${this.API_LINK}/users/logout`, { token: this.token });
  }

  // id is optional argument
  getProjects(id?) {
    console.log(this.token)
    const link = id ? `${this.API_LINK}/projects/${id}` : `${this.API_LINK}/projects`
    return this.http.get(link, this.httpOptions);
  }

  addProject(project) {
    return this.http.post( `${this.API_LINK}/projects`, project);
  }

  updateProject(project) {
    return this.http.put( `${this.API_LINK}/projects`, project);
  }

  deleteProject(id) {
    return this.http.delete( `${this.API_LINK}/projects/${id}`, this.httpOptions);
  }

  searchProject(fields) {
    return this.http.post( `${this.API_LINK}/projects/search`, fields);
  }

}
