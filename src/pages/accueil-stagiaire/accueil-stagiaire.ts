import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Modal,
  ModalController
} from "ionic-angular";
import { User } from "./../../model/User";
import { FireBaseDataBaseProvider } from "./../../providers/firebase-data-base/firebase-data-base";
import { LoadingServiceProvider } from "./../../providers/loading-service/loading-service";
import { ImageServiceProvider } from "./../../providers/image-service/image-service";
import { HomePage } from "./../home/home";
import { PageDasboardProPage } from './../page-dasboard-pro/page-dasboard-pro';
import { DocumentViewer } from "@ionic-native/document-viewer";
import { PdfViewerPage } from './../pdf-viewer/pdf-viewer';

@IonicPage()
@Component({
  selector: "page-accueil-stagiaire",
  templateUrl: "accueil-stagiaire.html"
})
export class AccueilStagiairePage {
  user_valide: User;
  url;
  constructor(
    public documentViewer: DocumentViewer,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrlService: LoadingServiceProvider,
    public fireBaseDataBase: FireBaseDataBaseProvider,
    public image_service: ImageServiceProvider,
    public modalCtrl: ModalController
  ) {
    this.user_valide = this.navParams.get("user");
    this.url = this.user_valide.CVpdf;
    console.log(this.user_valide);
    console.log("this.url", this.url);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AccueilStagiairePage");
  }
  signout() {
    this.loadingCtrlService.showLoading("A bientôt...");
    this.fireBaseDataBase.logout();
    this.navCtrl.setRoot(HomePage);
    console.log("Bye Bye");

    this.loadingCtrlService.hideLoading();
  }

  isConected() {
    if (this.fireBaseDataBase.isconected()) {
     return true;
    }
  }

  goToDash() {
    this.navCtrl.push(PageDasboardProPage);
  }
  onOpenPdf(): void {
    let modal: Modal = this.modalCtrl.create(PdfViewerPage, {
      displayData: {
        pdfSource: {
          url: `${this.url}`
        }
      }
    });
    modal.present();
  }
}
