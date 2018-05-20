import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

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
      this.toDate = this.dateToStruct(this.app.selectedProject.ProjectEndDate);
      this.fromDate = this.dateToStruct(this.app.selectedProject.ProjectStartDate);
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

  dateToStruct(date): NgbDateStruct {
    date = new Date(date);
    return {
      year: date.getFullYear(),
      month: date.getMonth()+1,
      day: date.getDate()
    }
  }

  saveProject() {
    if(this.fromDate) {
      this.app.selectedProject.ProjectStartDate = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day);
    }
    if(this.toDate) {
      this.app.selectedProject.ProjectEndDate = new Date(this.toDate.year, this.toDate.month, this.toDate.day);
    }
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
