import { Component, OnInit, ViewChild } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { ModalController } from '@ionic/angular';
import { OvernightModalComponent } from '../overnight-modal/overnight-modal.component';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	greetings:Array<string> = ["Good morning.", "Good afternoon.", "Good night."];
	messages:Array<string> = ["Hope you got a good night's rest.", "How's your day going?", "Go get some well-earned rest."]
	sleepMsg:string = "You don't have any sleep logged for today.";
	sleepinessMsg:string = "You don't have any sleepiness logs for today.";
	greeting:string;
	message:string;
	now:Date = new Date();

	sleepinessArray:Array<string> = [];
	startSleep:Date;
	endSleep:Date;
	sliderRange:number = 1;
	
  	constructor(public sleepService:SleepService, private modal: ModalController) {
		for (let i = 0; i < 7; i++) {
			this.sleepinessArray[i] = StanfordSleepinessData.ScaleValues[i];
		}

		if (this.now.getHours() > 6 && this.now.getHours() < 12) {
			this.greeting = this.greetings[0];
			this.message = this.messages[0];
		} else if (this.now.getHours() < 19) {
			this.greeting = this.greetings[1];
			this.message = this.messages[1];
		} else {
			this.greeting = this.greetings[2];
			this.message = this.messages[2];
		}

		this.startSleep = this.now;
		this.endSleep = this.now;

		let sleepArray:Array<OvernightSleepData> = SleepService.AllOvernightData;
		let sleepinessArray:Array<SleepData> = SleepService.AllSleepinessData;

		if (sleepArray[sleepArray.length-1].end().getDate() === this.now.getDate() &&
			sleepArray[sleepArray.length-1].end().getMonth() === this.now.getMonth() &&
			sleepArray[sleepArray.length-1].end().getFullYear() === this.now.getFullYear()) {
				this.sleepMsg = sleepArray[sleepArray.length-1].summaryString();
		}
		
		if (sleepinessArray[sleepinessArray.length-1].loggedAt.getDate() === this.now.getDate() &&
			sleepinessArray[sleepinessArray.length-1].loggedAt.getMonth() === this.now.getMonth() &&
			sleepinessArray[sleepinessArray.length-1].loggedAt.getFullYear() === this.now.getFullYear()) {
				this.sleepinessMsg = sleepinessArray[sleepinessArray.length-1].summaryString();
		}
	}

	ngOnInit() {;
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	async overnightModal() {
		const modal = await this.modal.create({
			component: OvernightModalComponent
		});
		modal.present();

		const { data, role } = await modal.onWillDismiss();

		if (role === 'confirm') {
			if (data.end.getDate() === this.now.getDate() && data.end.getMonth() === this.now.getMonth() && data.end.getFullYear === this.now.getFullYear()) {
				this.sleepMsg = data.summaryString();
			}
		}
	}
	
	cancel() {
		this.modal.dismiss('cancel');
	}

	sleepConfirm() {
		let sleepinessData:StanfordSleepinessData = new StanfordSleepinessData(this.sliderRange, new Date());
		this.sleepinessMsg = sleepinessData.summaryString();
		this.sleepService.logSleepinessData(sleepinessData);
		this.modal.dismiss();
	}

	updateRangeValue(event: any) {
		const ev = event;
		this.sliderRange = ev.detail.value;
		console.log(this.sliderRange);
	}
}
