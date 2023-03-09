import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    pathMatch:'prefix'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'logs',
    loadChildren: () => import('./logs/logs.module').then( m => m.LogsPageModule),
    pathMatch:'prefix'
  },
  {
    path:'home/logs',
    redirectTo: 'logs',
    pathMatch: 'prefix'
  },
  {
    path:'logs/home',
    redirectTo:'home',
    pathMatch:'prefix'
  },
  {
    path:'home',
    redirectTo:'home',
    pathMatch:'prefix'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
