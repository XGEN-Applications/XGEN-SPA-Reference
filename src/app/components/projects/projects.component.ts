import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: Array<any> = [];

  constructor(public app: AppService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(){
    this.app.showLoading = true;
    this.app.getProjects().subscribe((response: any) => {
      if(response.statusCode == 200) {
        this.projects = JSON.parse(response.body);
      } else {
        this.projects = [];
        const message = JSON.parse(response.body);
        this.app.messageAlert.emit({ alert: 'error', message });
        if(message == 'unathorized') this.app.navigate('login');
      }
      this.app.showLoading = false;
    }, err => {
      this.app.messageAlert.emit({ alert: 'error', message: 'server error' });
    });
  }

  upsertProject(project) {
    this.app.selectedProject = project;
    this.app.childNavigate('home', 'home-router', 'project-form');
  }

  deleteProject(project) {
    console.log('TODO')
  }

}
