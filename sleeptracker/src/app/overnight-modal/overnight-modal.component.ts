import { Component, OnInit } from '@angular/core';

import { AlertController, ModalController } from '@ionic/angular'
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

  constructor(private modal: ModalController, public sleepService:SleepService, private alert: AlertController) {
    this.start = this.now;
    this.end = this.now;
  }

  ngOnInit() {}

  // Throws an alert when time slept is equal to zero or less.
  async negativeAlert() {
    const alert = await this.alert.create({
      header: 'Error',
      subHeader: 'Zero or negative sleep time detected',
      message: 'Please enter valid starting and end times.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Throws an alert when one of the times picked is in the future.
  async timeAlert() {
    const alert = await this.alert.create({
      header: 'Error',
      subHeader: 'Time error',
      message: 'Start or end date-time is in the future. Please enter a valid time.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Closes the modal.
  cancel() {
		return this.modal.dismiss(null, 'cancel');
  }
	
  // Runs through error checks, and if none are present, properly logs and dismisses the modal.
	confirm() {
    if (new Date(this.start) >= new Date(this.end)) {
      this.negativeAlert();
      return;
    } else if (new Date(this.start) > new Date() || new Date(this.end) > new Date()) {
      this.timeAlert();
      return;
    } else {
      this.data = new OvernightSleepData(new Date(this.start), new Date(this.end));
      this.sleepService.logOvernightData(this.data);
      return this.modal.dismiss(this.data, 'confirm');
    }
	}

  // Updates time when date-time picker is used.
  updateStartTime(event: any) {
		const ev = event;
		this.start = ev.detail.value;
	}

	updateEndTime(event: any) {
		const ev = event;
		this.end = ev.detail.value;
	}
}
