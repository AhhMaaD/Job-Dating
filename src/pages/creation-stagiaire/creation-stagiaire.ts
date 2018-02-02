import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { LoadingServiceProvider } from "./../../providers/loading-service/loading-service";
import { FireBaseDataBaseProvider } from "./../../providers/firebase-data-base/firebase-data-base";
import { ImageServiceProvider } from "./../../providers/image-service/image-service";
import { AccueilStagiairePage } from "./../accueil-stagiaire/accueil-stagiaire";
import { User } from "./../../model/User";

import { FileUpload } from './../../model/FileUpload';


@IonicPage()
@Component({
  selector: "page-creation-stagiaire",
  templateUrl: "creation-stagiaire.html"
})
export class CreationStagiairePage {
  signUpForm: FormGroup;
  imageUser: any;
  pdf: any;
  currentFileUpload: FileUpload;
  selectedFiles;
  progress: { percentage: number } = { percentage: 0 };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrlService: LoadingServiceProvider,
    public fireBaseDataBase: FireBaseDataBaseProvider,
    public image_service: ImageServiceProvider,
    private formBuilder: FormBuilder
  ) {
    this.signUpForm = formBuilder.group({
      mail: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      passWord: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12)
        ])
      ],
      ville: [null, Validators.compose([Validators.required])],
      codePostal: [null, Validators.compose([Validators.required])],
      adresse: [null, Validators.compose([Validators.required])],
      userSex: [null, Validators.compose([Validators.required])],
      userName: [null, Validators.compose([Validators.required])],
      metier: [null, Validators.compose([Validators.required])],
      Phrase_d_accroche: [null, Validators.compose([Validators.required])],
      competence1: [null, Validators.compose([Validators.required])],
      competence2: [null, Validators.compose([Validators.nullValidator])],
      competence3: [null, Validators.compose([Validators.nullValidator])],
      experience1: [null, Validators.compose([Validators.required])],
      experience2: [null, Validators.compose([Validators.nullValidator])],
      experience3: [null, Validators.compose([Validators.nullValidator])],
      formation1: [null, Validators.compose([Validators.required])],
      formation2: [null, Validators.compose([Validators.nullValidator])], 
      formation3: [null, Validators.compose([Validators.nullValidator])],
      Linkedin: [null, Validators.compose([Validators.nullValidator])],
      telephone: [null, Validators.compose([Validators.required])],
      dateDeNaissance: [null, Validators.compose([Validators.required])] 
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CreationStagiairePage");
  }
  goBack() {
    this.navCtrl.pop();
  }

  //upload la photo ver la cache por la telecharge en firebase par la suite
  selectPhoto() {
    this.image_service.telechargeImage().then(a => {
      this.imageUser = a;
      ///je stocke l'image   uploadToFirebase
      this.fireBaseDataBase.uploadImageUser(this.imageUser);
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    try {
      const file = this.selectedFiles.item(0);
      this.currentFileUpload = new FileUpload(file);
      this.fireBaseDataBase.pushFileToStorage(this.currentFileUpload, this.progress);
    } catch (err) {
      console.log("err in  upload()  ", err);
    }
  }

  signUp() {
    this.loadingCtrlService.showLoading("Veuillez patienter!");

    let user: User = {
      ville: this.signUpForm.value["ville"],
      codePostal: this.signUpForm.value["codePostal"],
      adresse: this.signUpForm.value["adresse"],
      userSex: this.signUpForm.value["userSex"],
      mail: this.signUpForm.value["mail"],
      passWord: this.signUpForm.value["passWord"],
      userName: this.signUpForm.value["userName"],
      photoUser: this.fireBaseDataBase.getPhotoUser(),
      dateDeNaissance: this.signUpForm.value["dateDeNaissance"],
      metier: this.signUpForm.value["metier"],
      Phrase_d_accroche: this.signUpForm.value["Phrase_d_accroche"],
      competence1: this.signUpForm.value["competence1"],
      competence2: this.signUpForm.value["competence2"],
      competence3: this.signUpForm.value["competence3"],
      experience1: this.signUpForm.value["experience1"],
      experience2: this.signUpForm.value["experience2"], 
      experience3: this.signUpForm.value["experience3"],
      formation1: this.signUpForm.value["formation1"],
      formation2: this.signUpForm.value["formation1"],
      formation3: this.signUpForm.value["formation1"],
      Linkedin: this.signUpForm.value["Linkedin"],
      telephone: this.signUpForm.value["telephone"],
      CVpdf: this.fireBaseDataBase.geturl()
    };
    //je le stocke dans ma bases
    let a = this.fireBaseDataBase.signUpUser(user);

    a
      .then(a => {
        //let id =  this.fireBaseDataBase.getIdUser();
        //je le derige ver page l'accueil
        this.navCtrl.setRoot(AccueilStagiairePage, {
          user: user
        });

        //  console.log("image user form signUp", this.imageUser);
      })
      .catch(err => {
        console.log("err en function signUp en singup.ts", err);
      });
    this.loadingCtrlService.hideLoading();
  }
}
     