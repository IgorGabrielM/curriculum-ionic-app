import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollaboratorPage } from './collaborator.page';

const routes: Routes = [
  {
    path: '',
    component: CollaboratorPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollaboratorPageRoutingModule { }
