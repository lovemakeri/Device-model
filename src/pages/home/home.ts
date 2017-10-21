import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
title: string = "Device's model detection";
myDevice : MyDevice;


  constructor(private platform: Platform, public navCtrl: NavController, public alertCtrl: AlertController, private device: Device, private nativeStorage: NativeStorage) {

    this.platform.ready().then(() => {
      
      // this.getParts();
       this.getFromStorage();
      
            
      });

  }

  getFromStorage() 
  {
    this.nativeStorage.getItem('myDevice')
      .then(
        data => {  
          console.log(data);
          this.myDevice = JSON.parse(data);
                 },
        error => { 
          console.error(error);
                }
    );

  }





  ShowModel() 
  {

    this.detectModel();



if(this.myDevice!==null)
{

  this.saveToStorage();
 alert(this.myDevice.manufacturer+' '+this.myDevice.model);
/*    const myAlert = this.alertCtrl.create({
           title: 'Infornation',
           message: this.myDevice.manufacturer+' '+this.myDevice.model,
           buttons: [
             
             {
               text: 'Ok',
               handler: () => {
                 this.saveToStorage();

               }
             }
           ]
         });
         myAlert.present();
         */
        }
  }

  saveToStorage()
  {
    this.nativeStorage.setItem('myDevice', JSON.stringify(this.myDevice))
    .then(
      () => console.log('Stored model!'),
      error => console.error('Error storing model to native storage', error)
    );
  }
  

  detectModel()
  {
    this.myDevice= 
    { model : this.device.model,
      manufacturer : this.device.manufacturer
    }
  }

 
  exit()
  {

    const alert = this.alertCtrl.create({
      title: 'Thank you',
      message: 'Thank you for downloading our application.',
      buttons: [
       
        {
          text: 'Exit application',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();

  }

  
}

export interface MyDevice
{
model: string;
manufacturer : string;  
}
