import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ImageServiceProvider } from "./../../providers/image-service/image-service";
import { LoadingServiceProvider } from "./../../providers/loading-service/loading-service";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { CreationStagiairePage } from './../creation-stagiaire/creation-stagiaire';
import { AccueilStagiairePage } from './../accueil-stagiaire/accueil-stagiaire';
import { FireBaseDataBaseProvider } from './../../providers/firebase-data-base/firebase-data-base';
import { AccueilProPage } from './../accueil-pro/accueil-pro';

@IonicPage()
@Component({
  selector: "page-connection",
  templateUrl: "connection.html"
})
export class ConnectionPage {
  loginForm: FormGroup;
  // user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrlService: LoadingServiceProvider,
    public platform: Platform,
    public FireBase_DB: FireBaseDataBaseProvider,
    public image_service: ImageServiceProvider,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    this.loginForm = this.formBuilder.group({

      mail: [null, Validators.compose([Validators.required, Validators.email])],
      pass: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12)
        ])
      ]
    });
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad home");
  }

  signIn() {
    this.loadingCtrlService.showLoading("Veuillez Patienter...");

    this.FireBase_DB.loginUser(
      this.loginForm.value["mail"],
      this.loginForm.value["pass"]
    ).then(a => {
      //ici je vais stocker la donnée d'un user dans un variable en utilisant la fonction getUser
      this.FireBase_DB.getUser()
        .then(us => {
          let user = us;
          console.log("user form signIn() login", user);
          this.navCtrl.setRoot(AccueilStagiairePage, { user: user });
          //userId: this.user.userId
        })
        .catch(err => {
          this.loadingCtrlService.alertAdmin(
            "Homey Admin ",
            "veuillez corriger vos données \n" + err
          );
        });
    });

    this.loadingCtrlService.hideLoading();
  }

  //fonction pour inscrire
  verSignUpPage() {
    this.loadingCtrlService.showLoading("Veuillez Patienter...");
    this.navCtrl.push(CreationStagiairePage);
    this.loadingCtrlService.hideLoading();
  }

goToHome() {
    this.navCtrl.setRoot(AccueilProPage);
  }

  //fonctions pour récupérer la mote de passe
  recupererPass() {
    //alert("recupererPass()");
    let al = this.alertCtrl.create({
      title: "Récupérer votre compte",
      subTitle: "Entrer votre email pur récupérer votre mote de pass",
      inputs: [
        {
          name: "email",
          placeholder: "votre mail"
        }
      ],
      buttons: [
        {
          text: "Annuler",
          role: "cansel",
          handler: data => {
            alert("Vous avez annulez la récupération de votre compte");
            console.log("Vous avez annulez la récupération de votre compte");
          }
        },
        {
          text: "Valider",
          handler: data => {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var test = re.test(data.email.toLowerCase());
            if (test) {
              console.log(test);
              console.log(data.email);
              this.FireBase_DB.getBass(data.email);
            } else {
              alert(
                "Erreur pendant récupérer votre mote de pass veuillez reessayer."
              );
            }
          }
        }
      ]
    });
    al.present();
  }
}
