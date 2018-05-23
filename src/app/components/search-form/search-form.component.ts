import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

	public project = {
    ProjectID: null,
    ObjectiveID: null,
    ProjectTitle: null,
    ProjectDesc: null,
    ProjectStartDate: null,
    ProjectEndDate: null,
    ProjectStatusID: null,
    CreateBy: null,
    UpdateBy: null, 
    SortOrder: null, 
    OrgID: null
  }

  public fromDate: NgbDateStruct = this.calendar.getToday();
  public toDate: NgbDateStruct = this.calendar.getToday();

  constructor(public app: AppService, public calendar: NgbCalendar) { }

  ngOnInit() {
  }

  searchProject() {
    this.app.searchProject(this.project).subscribe(results => {
      this.app.searchActive = true;
      let projects = [];
      if(results['statusCode'] == 200) {
        projects = JSON.parse(results['body']);
      } else {
        this.app.messageAlert.emit({ alert: 'error', message: JSON.parse(results['body']) });
      }
      this.app.projectSearchResults.emit(projects);
      this.app.navigate('home');
    }, err => console.log(err));
  }



}
