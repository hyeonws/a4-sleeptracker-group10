import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogsPage } from './logs.page';

const routes: Routes = [
  {
    path: '',
    component: LogsPage,
    children: [
      {
        path: '',
        redirectTo: '/logs',
        pathMatch: 'full'
      },
      {
        path: 'logs',
        loadChildren: () => import('../logs/logs.module').then( m => m.LogsPageModule),
      },
      {
        path:'home',
        redirectTo: 'home',
        pathMatch: 'prefix'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogsPageRoutingModule {}
