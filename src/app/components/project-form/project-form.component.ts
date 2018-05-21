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
    
    // Test Values as specified:
    // Objective ID = 2
    // User ID = 1 (used in CreateBy and UpdateBy)
    // Optional Test Values (if needed):
    // Goal ID = 2
    // Plan ID = 2
    const { id } = this.app.getUserId(); 
    //Logged user Id, this should be done on server side, this is just a reference
    this.app.selectedProject.ObjectiveID = 2;

    // bootstrap date picker date conversion to mysql date

    if(this.fromDate) {
      const date = moment(new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day)).format('YYYY-MM-DD');
      this.app.selectedProject.ProjectStartDate = this.app.parseDate(date);
    }
    if(this.toDate) {
      const date = moment(new Date(this.toDate.year, this.toDate.month-1, this.toDate.day)).format('YYYY-MM-DD');
      this.app.selectedProject.ProjectEndDate = this.app.parseDate(date);
    }

    if(this.app.selectedProject.CreateDate) {
      const date = moment(new Date(this.app.selectedProject.CreateDate)).format('YYYY-MM-DD');
      this.app.selectedProject.CreateDate = this.app.parseDate(date);
    }

    if(this.app.selectedProject.UpdateDate) {
      const date = moment(new Date(this.app.selectedProject.UpdateDate)).format('YYYY-MM-DD');
      this.app.selectedProject.UpdateDate = this.app.parseDate(date);
    }

    if(this.isUpdate) { 
      this.updateProject(id);
    } else {
      this.createProject();
    }
    this.app.navigate('home');
  
  }

  updateProject(id) {
    this.app.selectedProject.UpdateBy = id;
    console.log(this.app.selectedProject);
    this.app.updateProject(this.app.selectedProject).subscribe((result: any) => {
    
      if(result.statusCode == 200) {
        this.app.messageAlert.emit({ alert: 'info', message: 'project updated' });
      } else {
        this.app.messageAlert.emit({ alert: 'error', message: JSON.parse(result.body) });
      }

    }, err => {
      this.app.messageAlert.emit({ alert: 'error', message: 'server error' })
    });
  }

  createProject() {

    this.app.addProject(this.app.selectedProject).subscribe((result: any) => {
      if(result.statusCode == 200) {
        this.app.messageAlert.emit({ alert: 'info', message: 'project inserted' });
      } else {
        this.app.messageAlert.emit({ alert: 'error', message: JSON.parse(result.body) });
      }

    }, err => {
      this.app.messageAlert.emit({ alert: 'error', message: 'server error' })
    });
  }

}
