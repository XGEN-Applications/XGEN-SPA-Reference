import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: Array<any> = [];
  public search: string = '';

  constructor(public app: AppService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(){
    this.app.showLoading = true;

    // display search results
    if(this.app.searchActive) {
      this.projects = this.app.projectsFound;
      return;
    }

    this.app.getProjects().subscribe((response: any) => {
      if(response.statusCode == 200) {
        this.projects = response.body;
      } else {
        this.projects = [];
        const message = response.body;
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

  confirmDeleteProject(project) {
    this.app.showConfirmMessagePromise('Confirm', 'Delete project?')    
      .then(result => {
        if(result == 'ok') this.deleteProject(project)
      })
      .catch(err => this.app.messageAlert.emit( {alert: 'error', message: 'cannot delete proejct'}))
  }

  deleteProject(project) {
    this.app.showLoading = true;
    this.app.deleteProject(project.ProjectID).subscribe((result: any) => {
      if(result.statusCode == 200) {
        const index = this.projects.indexOf(project)
        this.projects.splice(index, 1);
        this.app.messageAlert.emit({ alert: 'info', message: 'project deleted' });
      } else {
        this.app.messageAlert.emit({ alert: 'error', message: result.body });
      }
    })
  }

}
