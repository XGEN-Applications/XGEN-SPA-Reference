import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  public isUpdate: boolean = false;
  public fromDate: NgbDateStruct = this.calendar.getToday();
  public toDate: NgbDateStruct = this.calendar.getToday();

  constructor(public calendar: NgbCalendar, public app: AppService) { }

  ngOnInit() {
    if(this.app.selectedProject) {
      this.isUpdate = true;
    } else {
      this.app.selectedProject = {
        ProjectTitle: '',
        ProjectDesc: '',
        ProjectStartDate: new Date(),
        ProjectEndDate: new Date()
      }
    }
  }

  saveProject() {
    if(this.isUpdate) {
      this.app.updateProject(this.app.selectedProject).subscribe((result: any) => {
        if(result.statusCode == 200) {
          this.app.messageAlert.emit({ alert: 'info', message: 'project updated' });
        } else {
          this.app.messageAlert.emit({ alert: 'error', message: JSON.parse(result.body) });
        }
      }, err => this.app.messageAlert.emit({ alert: 'error', message: 'server error' }));
    } else {
      this.app.addProject(this.app.selectedProject).subscribe((result: any) => {
        if(result.statusCode == 200) {
          this.app.messageAlert.emit({ alert: 'info', message: 'project inserted' });
        } else {
          this.app.messageAlert.emit({ alert: 'error', message: JSON.parse(result.body) });
        }
      }, err => this.app.messageAlert.emit({ alert: 'error', message: 'server error' }));
    }
    this.app.navigate('projects');
  
  }

}
