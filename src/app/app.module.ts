import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AccueilProPage } from '../pages/accueil-pro/accueil-pro';
import { PageDasboardProPage } from '../pages/page-dasboard-pro/page-dasboard-pro';
import { ConnectionPage } from '../pages/connection/connection';
import { CreationStagiairePage } from '../pages/creation-stagiaire/creation-stagiaire';
import { ImageServiceProvider } from '../providers/image-service/image-service';
import { LoadingServiceProvider } from '../providers/loading-service/loading-service';
import { PdfViewerPage } from "./../pages/pdf-viewer/pdf-viewer";
 import { FormsModule, ReactiveFormsModule } from "@angular/forms";
 import { FireBaseDataBaseProvider } from "./../providers/firebase-data-base/firebase-data-base";
import { Camera } from "@ionic-native/camera";
import { AccueilStagiairePage } from "./../pages/accueil-stagiaire/accueil-stagiaire";
import { DocumentViewer } from '@ionic-native/document-viewer';
//dataBase
import * as firebase from "firebase";
import { PdfViewerModule } from "ng2-pdf-viewer";

  // Initialize Firebase
firebase.initializeApp({
  apiKey: "********************************",
  authDomain: "***************************",  
  databaseURL: "********************************",
  projectId: "*********",
  storageBucket: "jobdating-5f379.appspot.com",
  messagingSenderId: "719574510416"
});


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AccueilProPage,
    PageDasboardProPage,
    ConnectionPage,
    CreationStagiairePage,
    AccueilStagiairePage,
    PdfViewerPage
  ],   
  imports: [
  
  BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AccueilProPage,
    PageDasboardProPage,
    ConnectionPage,
    CreationStagiairePage,
    AccueilStagiairePage,
    PdfViewerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ImageServiceProvider,
    LoadingServiceProvider,
    FireBaseDataBaseProvider,
    Camera,
    DocumentViewer
  ]
})
export class AppModule {} 
