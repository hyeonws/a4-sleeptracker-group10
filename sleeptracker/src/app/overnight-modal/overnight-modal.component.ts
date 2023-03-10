import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular'

import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { SleepService } from '../services/sleep.service';

@Component({
  selector: 'app-overnight-modal',
  templateUrl: './overnight-modal.component.html',
  styleUrls: ['./overnight-modal.component.scss'],
})
export class OvernightModalComponent implements OnInit {
  now = new Date();
  start:Date;
	end:Date;
  data!:OvernightSleepData;

  constructor(private modal: ModalController, public sleepService:SleepService) {
    this.start = this.now;
    this.end = this.now;
  }

  ngOnInit() {}

  cancel() {
		return this.modal.dismiss(null, 'cancel');
  }
	
	confirm() {
		this.data = new OvernightSleepData(new Date(this.start), new Date(this.end));
		this.sleepService.logOvernightData(this.data);
		return this.modal.dismiss(this.data, 'confirm');
	}

  updateStartTime(event: any) {
		const ev = event;
		this.start = ev.detail.value;
	}

	updateEndTime(event: any) {
		const ev = event;
		this.end = ev.detail.value;
	}
}
