import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccueilProPage } from './accueil-pro';

@NgModule({
  declarations: [
    AccueilProPage,
  ],
  imports: [
    IonicPageModule.forChild(AccueilProPage),
  ],
})
export class AccueilProPageModule {}
