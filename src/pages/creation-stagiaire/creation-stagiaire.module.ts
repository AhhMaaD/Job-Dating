import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreationStagiairePage } from './creation-stagiaire';

@NgModule({
  declarations: [
    CreationStagiairePage,
  ],
  imports: [
    IonicPageModule.forChild(CreationStagiairePage),
  ],
})
export class CreationStagiairePageModule {}
