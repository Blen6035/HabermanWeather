import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  data: any = null;

  constructor(public http: Http) {
    console.log('Hello WeatherService Provider');
   }
   load(){
     if (this.data) {
       return Promise.resolve(this.data);
     }
     return new Promise(resolve => {
       this.http.get('assets/data/data.json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
     });
   }
   getWeather(){
     return this.load().then(data => {
       return data;
     });
   }
}
