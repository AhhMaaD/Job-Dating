import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { LoadingServiceProvider } from "./../loading-service/loading-service";
import { User } from './../../model/User';
import { ImageServiceProvider } from "./../image-service/image-service";

import { FileUpload } from './../../model/FileUpload';
import { Observable } from "rxjs/Observable";

@Injectable()
export class FireBaseDataBaseProvider {
  public list_users = [];
  public PhotoURL_user: any;
  public PhotoURL_PDF: any;
  url;
  idLogement;
  constructor(
    public loadingCtrlService: LoadingServiceProvider,
    public imag_Service: ImageServiceProvider
  ) {
    console.log("Hello FireBaseDatabaseProvider Provider");
  }

  //functions pour aller chercher tous les user dans la bases
  listUsers(): Promise<any> {
    //je vais suivre et surveiller la base en utilisant OBSERVABLE, et je cherche les données les quelles j'aura besoin
    return new Promise(solve => {
      firebase
        .database()
        .ref("users")
        .orderByKey()
        .once("value",(log_items: any) => {
          this.list_users = [];
            //je remplie ma array avec de ma donnée avec loop
          log_items.forEach(userSnapShot => {

              this.list_users.push({
                userId: userSnapShot.val().userId,
                ville: userSnapShot.val().userVille,
                codePostal: userSnapShot.val().userCodePostal,
                adresse: userSnapShot.val().userAdresse,
                userSex: userSnapShot.val().userSex,
                mail: userSnapShot.val().email,
                passWord: userSnapShot.val().userPassWord,
                userName: userSnapShot.val().userName,
                photoUser: userSnapShot.val().photoUser,
                dateDeNaissance: userSnapShot.val().dateDeNaissance,
                Linkedin: userSnapShot.val().Linkedin,
                telephone: userSnapShot.val().telephone,
                competence1: userSnapShot.val().competence1,
                competence2: userSnapShot.val().competence2,
                competence3: userSnapShot.val().competence3,
                experience1: userSnapShot.val().experience1,
                experience2: userSnapShot.val().experience2,
                experience3: userSnapShot.val().experience3,
                formation1: userSnapShot.val().formation1,
                formation2: userSnapShot.val().formation2,
                formation3: userSnapShot.val().formation3,
                CVpdf: userSnapShot.val().CVpdf,
                metier: userSnapShot.val().metier,
                Phrase_d_accroche: userSnapShot.val().Phrase_d_accroche
              });
            });
            //gand ça finie je commence avec le deuxieme et comme ce jusqu'a je remplirai ma array avec toutes les données
          solve(this.list_users);

          },
          err => {
            console.log(
              "Erreure pendant recuprer les données de toutes les users dans la base: ",
              err
            );
            alert(
              "Erreure pendant recuprer les données de toutes les users dans la base: " +
                err
            );
            console.dir(err);
          }
        );
    });
  }

  //function pour supprimeùr un user
  deletUser(id): Promise<any> {
    return new Promise(resolve => {
      let userReference = firebase
        .database()
        .ref("users")
        .child(id);
      userReference.remove();
      resolve(true);
      this.loadingCtrlService.alertAdmin(
        "Homey Admin",
        "Votre compte avait supprimé avec succès"
      );
    }).catch(err => {
      this.loadingCtrlService.alertAdmin(
        "Homey Admin",
        "Ereure pendant supperimer le compte " + err
      );

      console.log("Ereure pendant supperimer le compte " + err);
    });
  }

  //function pour modifier le profile un user
  updateUser(id: any, user: User): Promise<any> {
    return new Promise(resolve => {
      let userUpdate = firebase
        .database()
        .ref("users")
        .child(id);
      userUpdate.update(user);
      resolve(true);
      this.loadingCtrlService.alertAdmin(
        "Homey Admin",
        "Votre compte avait modifié avec succès"
      );
    }).catch(err => {
      this.loadingCtrlService.alertAdmin(
        "Homey Admin",
        "Erreure pendant modifer votre profile" + err
      );

      console.log("Erreure pendant modifer votre profile" + err);
    });
  }

  //function pour uploder un photo d'user
  uploadImageUser(userImage) {
    //on le donne un nom unique
    let imageUserName: string =
        "user_photo_date_le" + new Date().getTime() + ".jpg",
      storgeReference: any,
      uploadStatue: any;

    // je le dis tu vas la stocke où
    storgeReference = firebase
      .storage()
      .ref("users-Photoes/")
      .child(imageUserName);
    console.log("storgeReference", storgeReference);
    //je la stocke en format base64 in type url
    uploadStatue = storgeReference
      .putString(userImage, "base64", {
        contentType: "image/png"
      })
      .then(enregistrerPic => {
        this.PhotoURL_user = enregistrerPic.downloadURL;
        console.log("myPhotoURL", this.PhotoURL_user);
      })
      .catch(
        err => {
          alert("err pendant uploade votre image" + err);
        },
        success => {
          //alert("err pendant uploade votre image" + success);
        }
      );
    return this.PhotoURL_user;
  }

  //get photoUser
  getPhotoUser() {
    return this.PhotoURL_user;
  }
  //get photoUser
  geturl() {
    return this.url;
  }
  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref("lesCV/");
    const uploadTask = storageRef
      .child(`${fileUpload.file.name}`)
      .put(fileUpload.file);
    try {
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          progress.percentage = Math.round(
            snap.bytesTransferred / snap.totalBytes * 100
          );
        },
        error => {
          // fail
          console.log(error);
        },
        () => {
          // success
          fileUpload.url = uploadTask.snapshot.downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
          this.url = uploadTask.snapshot.downloadURL;
        }
      );
    } catch (err) {
      console.log("err en fonction saveFileDate", err);
    }
  }

  saveFileData(fileUpload: FileUpload) {
    try {
      firebase
        .storage()
        .ref("lesCV")
        .put(fileUpload)
        .catch(err => {
          console.log("err en fonction saveFileDate", err);
        });
    } catch (err) {
      console.log("err en fonction saveFileDate", err);
    }
  }

  ///function pour férfier si l'user est exisite ou pas dans la bases
  loginUser(mail: string, passWord: string): Promise<any> {
    return new Promise(solve => {
      firebase
        .auth()
        .signInWithEmailAndPassword(mail, passWord)
        .then(data => {
          this.loadingCtrlService.alertAdmin(
            "Homey Admin ",
            "Bienvenu " + mail
          );

          // console.log(data);
          solve(true);
        })
        .catch(err => {
          this.loadingCtrlService.alertAdmin(
            "Homey Admin ",
            "veuillez corriger vos données \n" + err
          );
        });
    });
  }

  //recupérer profile user
  getUser(): Promise<any> {
    let uid = firebase.auth().currentUser.uid;

    console.log(uid);
    return new Promise(data => {
      firebase
        .database()
        .ref("/users")
        .child(uid)
        .once("value")
        .then(function(userSnapShot) {
          let user: User = {
            userId: uid,
            ville: userSnapShot.val().userVille,
            codePostal: userSnapShot.val().userCodePostal,
            adresse: userSnapShot.val().userAdresse,
            userSex: userSnapShot.val().userSex,
            mail: userSnapShot.val().email,
            passWord: userSnapShot.val().userPassWord,
            userName: userSnapShot.val().userName,
            photoUser: userSnapShot.val().photoUser,
            dateDeNaissance: userSnapShot.val().dateDeNaissance,
            Linkedin: userSnapShot.val().Linkedin,
            telephone: userSnapShot.val().telephone,
            competence1: userSnapShot.val().competence1,
            competence2: userSnapShot.val().competence2,
            competence3: userSnapShot.val().competence3,
            experience1: userSnapShot.val().experience1,
            experience2: userSnapShot.val().experience2,
            experience3: userSnapShot.val().experience3,
            formation1: userSnapShot.val().formation1,
            formation2: userSnapShot.val().formation2,
            formation3: userSnapShot.val().formation3,
            CVpdf: userSnapShot.val().CVpdf,
            metier: userSnapShot.val().metier,
            Phrase_d_accroche: userSnapShot.val().Phrase_d_accroche
          };
          data(user);
        });
    });
  }

  //d user
  getIdUser() {
    return firebase.auth().currentUser.uid;
  }
  isconected(){
    if(firebase.auth().currentUser){
return true;
    }else{
      return false;
    }
  }

  //fonction pour récupérer l'id de derniere logement etaait creé pae l'user
  getDerniereIDLogement() {
    return this.idLogement;
  }

  //function pour créer un user il faut savoir que fairebase ne stocke pas les informations des users il stocke seulement la meudule de connexion,
  // pour cela il faudra on la faire mainullement
  //grace à ca on crée le profile
  signUpUser(user: User): Promise<any> {
    //la function createUserWithEmailAndPassword il crée un user et il le signin automatique
    return new Promise(resolve => {
      // let id = new Date().getMilliseconds+'jobDAting'+new Date().getMilliseconds
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.mail, user.passWord)
        .then( newUser => {
          console.log("newUser.uid", newUser.uid);
           firebase
             .database()
             .ref("users")
             .child(newUser.uid)
             .set({
               userId: newUser.uid,
               email: user.mail,
               userName: user.userName,
               userPassWord: user.passWord,
               userVille: user.ville,
               userCodePostal: user.codePostal,
               userAdresse: user.adresse,
               photoUser: user.photoUser,
               dateDeNaissance: user.dateDeNaissance,
               userSex: user.userSex,
               Linkedin: user.Linkedin,
               telephone: user.telephone,
               competence1: user.competence1,
               competence2: user.competence2,
               competence3: user.competence3,
               experience1: user.experience1,
               experience2: user.experience2,
               experience3: user.experience3,
               formation1: user.formation1,
               formation2: user.formation2,
               formation3: user.formation3,
               CVpdf: user.CVpdf,
               metier: user.metier,
               Phrase_d_accroche:user.Phrase_d_accroche
             });
          resolve(true);
          this.loadingCtrlService.alertAdmin(
            "Homey Admin ",
            "Votre compte est bien crée Bienvenu " + user.userName
          );
        })
        .catch(err => {
          this.loadingCtrlService.alertAdmin(
            "Homey Admin ",
            "veuillez corriger vos données \n" + err
          );
        });
    });
  }
  //fonction pour couper la conexion avec la base par rapport l'user
  logout() {
    firebase
      .auth()
      .signOut()
      .catch(err => {
        console.log("err en fonction logOut en fire_base_service", err.message);
      });
  }

  ///function pour récupérer la mote de bass
  getBass(mail: string) {
    firebase
      .auth()
      .sendPasswordResetEmail(mail)
      .then(a => {
        this.loadingCtrlService.alertAdmin(
          "Homey Admin",
          "J'ai vous envoyé un email pour récuprérer votre mote de pass"
        );
      })
      .catch(err => {
        this.loadingCtrlService.alertAdmin(
          "Homey Admin",
          "Erreur pendant récupérer le mote de pass " + err
        );
        console.log(
          "err pendant récupérer le mote de pass en fonction getBass en firebaseService",
          err
        );
      });
  }
}
