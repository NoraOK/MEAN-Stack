import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  cakes: any;
  newCake: any = {'baker':'','image': ''}
  oneCake: any

  constructor(private _httpService: HttpService){}

  ngOnInit(){
    this.getCakesFromService();
  }
  getCakesFromService(){
    let observable = this._httpService.getCakes();
    observable.subscribe((data:any[]) => {
      console.log("Got noras cakes!", data)
      for(var cake of data){
        console.log(cake)
        cake.newRating = {comment: '', rating: 0 }
      }
      this.cakes = data;
    });
  }

  updateCake(cake){
    let observable = this._httpService.updateCake(cake._id, cake.newRating)
    observable.subscribe(data => {
      console.log('GOT BACK CAKE UPDATE DATA: ', data)
      cake.newRating = {comment:'', rating: 0}
      this.getOneCake(cake)
    })
  }

  getOneCake(cake){
    let observable = this._httpService.getOneCake(cake._id);
    observable.subscribe(data => {
      console.log("Got nora's one task!", data)
      this.oneCake = data;
    })
  }

  createCakesFromService(){
    console.log(this.newCake)
    let observable = this._httpService.addCake(this.newCake);
    observable.subscribe(data => {
      console.log("Got noras tasks!", data)
      this.newCake = {baker: "", image:""}
      this.getCakesFromService();
    })
  }


}
