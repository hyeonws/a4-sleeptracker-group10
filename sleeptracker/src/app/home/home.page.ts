import { Component, OnInit, ViewChild } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { ModalController } from '@ionic/angular';
import { OvernightModalComponent } from '../overnight-modal/overnight-modal.component';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	greetings:Array<string> = ["Good morning.", "Good afternoon.", "Good night."];
	messages:Array<string> = ["Hope you got a good night's rest.", "How's your day going?", "Go get some well-earned rest."]
	sleepMsg!:string;
	sleepinessMsg!:string;
	greeting:string;
	message:string;
	now:Date = new Date();

	sleepinessScale:Array<string> = [];
	startSleep:Date;
	endSleep:Date;
	sliderRange:number = 1;
	
  	constructor(public sleepService:SleepService, private modal: ModalController, private toastController: ToastController) {
		for (let i = 0; i < 7; i++) {
			this.sleepinessScale[i] = StanfordSleepinessData.ScaleValues[i];
		}

		if (this.now.getHours() > 6 && this.now.getHours() < 12) {
			this.greeting = this.greetings[0];
			this.message = this.messages[0];
		} else if (this.now.getHours() > 11 && this.now.getHours() < 19) {
			this.greeting = this.greetings[1];
			this.message = this.messages[1];
		} else {
			this.greeting = this.greetings[2];
			this.message = this.messages[2];
		}

		this.startSleep = this.now;
		this.endSleep = this.now;

		let sleepArray:Array<OvernightSleepData> = SleepService.AllOvernightData;
		let sleepinessArray:Array<StanfordSleepinessData> = SleepService.AllSleepinessData;

		this.setSleepMsg(sleepArray);
		this.setSleepinessMsg(sleepinessArray);
	}

	ngOnInit() {
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	setSleepMsg(arr: Array<OvernightSleepData>) {
		if (arr.length > 0 && arr[arr.length-1].end().getDate() === this.now.getDate() &&
			arr[arr.length-1].end().getMonth() === this.now.getMonth() &&
			arr[arr.length-1].end().getFullYear() === this.now.getFullYear()) {
				this.sleepMsg = arr[arr.length-1].summaryString();
		} else {
			this.sleepMsg = "You don't have any sleep logged for today.";
		}
	}

	setSleepinessMsg(arr: Array<StanfordSleepinessData>) {
		if (arr.length > 0 && arr[arr.length-1].loggedAt.getDate() === this.now.getDate() &&
			arr[arr.length-1].loggedAt.getMonth() === this.now.getMonth() &&
			arr[arr.length-1].loggedAt.getFullYear() === this.now.getFullYear()) {
				this.sleepinessMsg = arr[arr.length-1].summaryString();
		} else {
			this.sleepinessMsg = "You don't have any sleepiness logs for today.";
		}
	}

	async presentToast() {
		const toast = await this.toastController.create({
			message: 'Log successfully added!',
			duration: 2500,
			position: 'bottom',
			translucent: true,
			icon: 'checkmark-done-outline',
			buttons: [
				{
					text: 'Undo',
					role: 'undo'
				},
				{
					text: 'Dismiss',
					role: 'cancel'
				}
			]
		});

		await toast.present();
		const { role } = await toast.onDidDismiss();

		if (role == 'undo') {
			let data = SleepService.AllSleepData.pop();
			if (data?.constructor.name == 'OvernightSleepData') {
				SleepService.AllOvernightData.pop();
				let arr = SleepService.AllOvernightData;
				this.setSleepMsg(arr);
			} else {
				SleepService.AllSleepinessData.pop();
				let arr = SleepService.AllSleepinessData;
				this.setSleepinessMsg(arr);
			}

			this.undoToast(data);
		}
	}

	async undoToast(data: any) {
		const toast = await this.toastController.create({
			message: 'Undo successful.',
			duration: 2500,
			position: 'bottom',
			translucent: true,
			icon: 'arrow-undo-outline',
			buttons: [
				{
					text: 'Redo',
					role: 'redo'
				},
				{
					text: 'Dismiss',
					role: 'cancel'
				}
			]
		});

		await toast.present();
		const { role } = await toast.onDidDismiss();

		if (role == 'redo') {
			if (data.constructor.name == 'OvernightSleepData') {
				this.sleepService.logOvernightData(data);
				this.setSleepMsg(SleepService.AllOvernightData);
			} else {
				this.sleepService.logSleepinessData(data);
				this.setSleepinessMsg(SleepService.AllSleepinessData);
			}
		}
	}

	async overnightModal() {
		const modal = await this.modal.create({
			component: OvernightModalComponent
		});
		modal.present();

		const { data, role } = await modal.onWillDismiss();

		if (role === 'confirm') {
			let dateCheck:boolean = data.end().getDate() == this.now.getDate();
			let monthCheck:boolean = data.end().getMonth() == this.now.getMonth();
			let yearCheck:boolean = data.end().getFullYear() == this.now.getFullYear();

			if (dateCheck && monthCheck && yearCheck) {
				this.sleepMsg = data.summaryString();
			}
			this.presentToast();
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
		this.presentToast();
		this.sliderRange = 1;
	}

	updateRangeValue(event: any) {
		const ev = event;
		this.sliderRange = ev.detail.value;
	}
}
