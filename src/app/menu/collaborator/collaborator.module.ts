import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollaboratorPageRoutingModule } from './collaborator-routing.module';

import { CollaboratorPage } from './collaborator.page';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollaboratorPageRoutingModule,
    HttpClientModule
  ],
  declarations: [
    CollaboratorPage,
  ],
  providers: [
    HttpClient
  ]
})
export class CollaboratorPageModule { }
