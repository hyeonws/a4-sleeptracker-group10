import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {
  sleepData:SleepData[] = [];

  constructor(public sleepService:SleepService) { 
    this.sleepData = this.allSleepData.reverse();
  }

  ngOnInit() {
  }

  get allSleepData() {
		return SleepService.AllSleepData;
	}

  onIonInfinite(ev:any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
