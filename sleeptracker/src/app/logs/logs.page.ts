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

  // Stores the sleepData array in reverse, so that logs can be displayed from latest to oldest.
  constructor(public sleepService:SleepService) { 
    this.sleepData = this.allSleepData.slice().reverse();
  }

  ngOnInit() {
  }

  get allSleepData() {
		return SleepService.AllSleepData;
	}

  // Implements infinite scrolling to view more logs.
  onIonInfinite(ev:any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
