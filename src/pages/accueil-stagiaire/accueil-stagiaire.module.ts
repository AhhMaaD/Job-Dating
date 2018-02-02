import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccueilStagiairePage } from './accueil-stagiaire';

@NgModule({
  declarations: [
    AccueilStagiairePage,
  ],
  imports: [
    IonicPageModule.forChild(AccueilStagiairePage),
  ],
})
export class AccueilStagiairePageModule {}
