import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";





@IonicPage()
@Component({
  selector: "page-pdf-viewer", 
  templateUrl: "pdf-viewer.html"
})
export class PdfViewerPage {
  displayData: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
  
  ) {

  
  } 

  ionViewDidLoad() {
    

    this.displayData = this.navParams.get("displayData");
    console.log("this.displayData ", this.displayData.pdfSource);
  }

  onClose(): void {
    this.viewCtrl.dismiss();
  }
}
