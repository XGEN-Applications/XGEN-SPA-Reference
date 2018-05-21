import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirm-component',
  templateUrl: './confirm.component.html'
})

export class ConfirmComponent {
  @Input() message;
  @Input() title;
  constructor(public activeModal: NgbActiveModal) {}

  ok() {
    this.activeModal.close('ok')
  }

  cancel() {
    this.activeModal.close('cancel')
  }

}
