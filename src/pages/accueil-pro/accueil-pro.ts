import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PageDasboardProPage } from '../page-dasboard-pro/page-dasboard-pro';

/**
 * Generated class for the AccueilProPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accueil-pro',
  templateUrl: 'accueil-pro.html',
})
export class AccueilProPage {



  card ={
    
      imageUrl: '../assets/imgs/map.png',
      name: 'AFPA Rennes',
      ETA: '02 99 26 56 26',
      distance: '',
      placeName: 'AFPA Rennes',
      placeAddress: '6 Av. du Haut-Sancé, 35000 Rennes',
      placeIcon: 'md-home'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccueilProPage');
  }
  placeTapped(place) {
    alert(place.name + ' was tapped.');
  }

  getDirections(card) {
    alert('Getting directions to ' + card.name);
  }

  seeInMap(card) {
    alert('Seeing ' + card.name + ' on maps.');
  }

  goToDash(){
    this.navCtrl.push(PageDasboardProPage);
  }

}
