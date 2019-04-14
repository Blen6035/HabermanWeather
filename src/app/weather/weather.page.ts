import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../weather.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RefresherEventDetail } from '@ionic/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CurrentLoc } from './../interfaces/current-loc';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  theWeather: any = {};
  currentData: any = {};
  day1: any = {};
  day2: any = {};
  day3: any = {};
  loading: any;
  isLoading: boolean;

  constructor(public router: Router, //tabs app we didnt use nav control or navParams
    public weatherService: WeatherService, public loadingCtrl: LoadingController, 
    private refreshEventDetail: RefresherEventDetail,
    private geolocation: Geolocation,) {
      this.presentLoader();
      geolocation.getCurrentPosition().then(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        this.currentLoc.lat = pos.coords.latitude;
        this.currentLoc.lon = pos.coords.longitude;
        this.currentLoc.timestamp = pos.timestamp;

      });
      this.weatherService.getWeather().then( theResult => {
      this.theWeather = theResult;
      this.currentData = this.theWeather.currently;
      this.day1 = this.theWeather.daily.data[0];
      this.day2 = this.theWeather.daily.data[1];
      this.day3 = this.theWeather.daily.data[2];
      this.dismissLoader();
    });
  };

  async presentLoader() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: 'Loading...',
      // duration: 5000
    }).then( loader => {
      loader.present().then(() => {
        if (!this.isLoading) {
          loader.dismiss()
        }
      });
    });
  }

  async dismissLoader() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss();
  }

  doRefresh(event){
    setTimeout( ()=> {
      event.target.complete();
    }, 2000 );
  }

  ngOnInit() {
  }

}
