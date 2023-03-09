import { Component, OnInit, ViewChild } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { now } from '@ionic/core/dist/types/utils/helpers';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	@ViewChild(IonModal) modal!:IonModal;
	daynight:string;
	greetings:Array<string> = ["Good morning.", "Good afternoon.", "Good night."];
	messages:Array<string> = ["Hope you got a good night's rest.", "How's your day going?", "Go get some well-earned rest."]
	greeting:string;
	message:string;
	loggedDate:string;
	test:any;

	name:string="";

	startSleep:Date;
	endSleep:Date;
	overnightSleepDataArray: OvernightSleepData[] = [];
	sleepMsg:string = "You don't have any sleep logged for today.";
	
  	constructor(public sleepService:SleepService) {
		let now = new Date();
		if (now.getHours() > 6 && now.getHours() < 12) {
			this.daynight = "day";
			this.greeting = this.greetings[0];
			this.message = this.messages[0];
		} else if (now.getHours() < 19) {
			this.daynight = "afternoon";
			this.greeting = this.greetings[1];
			this.message = this.messages[1];
		} else {
			this.daynight = "night";
			this.greeting = this.greetings[2];
			this.message = this.messages[2];
		}
		this.loggedDate = this.allSleepData[0]['loggedAt'].toDateString();
		this.startSleep = now;
		this.endSleep = now;
	}

	ngOnInit() {;
		console.log(this.loggedDate);
		console.log(this.allSleepData);
		this.overnightSleepDataArray = SleepService.AllOvernightData;
		console.log(this.startSleep);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	addLog() {
		console.log("Button clicked!");
	}
	
	cancel() {
		this.modal.dismiss(null, 'cancel');
	  }
	
	confirm() {
		let overnightSleep: OvernightSleepData = new OvernightSleepData(new Date(this.startSleep), new Date(this.endSleep));
		this.sleepService.logOvernightData(overnightSleep);
		this.sleepMsg = overnightSleep.summaryString();
		this.modal.dismiss(this.name, 'confirm');
	}

	updateStartTime(event: any) {
		const ev = event;
		this.startSleep = ev.detail.value;
	}

	updateEndTime(event: any) {
		const ev = event;
		this.endSleep = ev.detail.value;
	}
}
