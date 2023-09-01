import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'collaborator',
    loadChildren: () => import('../collaborator/collaborator.module').then(m => m.CollaboratorPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
