import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogsPage } from './logs.page';

const routes: Routes = [
  {
    path: '',
    component: LogsPage,
    children: [
      {
        path: 'logs',
        loadChildren: () => import('../logs/logs.module').then( m => m.LogsPageModule)
      },

    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogsPageRoutingModule {}
