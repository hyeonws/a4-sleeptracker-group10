import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { now } from '@ionic/core/dist/types/utils/helpers';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	daynight:string;
	greetings:Array<string> = ["Good morning.", "Good afternoon.", "Good night."];
	messages:Array<string> = ["Hope you got a good night's rest.", "How's your day going?", "Go get some well-earned rest."]
	greeting:string;
	message:string;
	loggedDate:string;


	startSleep:string=new Date().toISOString();
	endSleep:string=new Date().toISOString();
	overnightSleepDataArray: OvernightSleepData[] = [];
	
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
	}

	ngOnInit() {;
		console.log(this.loggedDate);
		console.log(this.allSleepData);
		console.log(new Date().getHours());
		console.log(this.greeting);
		console.log(this.message);
		this.overnightSleepDataArray = SleepService.AllOvernightData;
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	addLog() {
		var newStartSleep = new Date(this.startSleep);
		var newEndSleep = new Date(this.endSleep);
		let overnightSleep: OvernightSleepData = new OvernightSleepData(newStartSleep, newEndSleep);
		this.sleepService.logOvernightData(overnightSleep);
	}

}
