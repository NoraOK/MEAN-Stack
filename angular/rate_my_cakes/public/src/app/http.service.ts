import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { 

  }
  getCakes(){
    return this._http.get('/cakes');
  }

  getOneCake(id){
    return this._http.get('/cakes/'+id);
  }

  addCake(newCake){
    console.log("NEW TASK INSIDE HTTP SERVICE", newCake)
    return this._http.post('/cakes/new', newCake);
  }

  deleteCake(id){
    return this._http.delete("/cakes/delete/"+id);
  }
  updateCake(cake_id, newRating){
    return this._http.put("/cakes/update/"+cake_id, newRating)
  }
}
