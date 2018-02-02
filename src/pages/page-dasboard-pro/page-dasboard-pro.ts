import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageServiceProvider } from './../../providers/image-service/image-service';
import { FireBaseDataBaseProvider } from './../../providers/firebase-data-base/firebase-data-base';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { AccueilStagiairePage } from './../accueil-stagiaire/accueil-stagiaire';
import { User } from './../../model/User';



@IonicPage()
@Component({
  selector: 'page-page-dasboard-pro',
  templateUrl: 'page-dasboard-pro.html', 
})
export class PageDasboardProPage {
  users = new Array(10);
  selected_user: User;
  list_users=[];
  userID;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrlService: LoadingServiceProvider,
    public fireBaseDataBase: FireBaseDataBaseProvider,
    public image_service: ImageServiceProvider) {
    console.log('this.list_users1', this.list_users);


  }

  getListUsers_async(){

   console.log('this.list_users3', this.list_users);
  return  this.fireBaseDataBase.listUsers();


}

   async  ionViewDidLoad() {
      let a = this.getListUsers_async();
    await   a.then( a => {
        this.list_users =  a;
      })

    console.log('ionViewDidLoad PageDasboardProPage');

      console.log('this.list_users2', this.list_users);


  }
  goToProfil(_user) {
    this.navCtrl.push(AccueilStagiairePage, {
      user: _user
    });
  }
  goBack() {
    this.navCtrl.pop();
  }
}
