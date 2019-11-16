import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { 

  }
  getAuthors(){
    return this._http.get('/authors_json');
  }

  findAuthor(id){
    return this._http.get('/authors_json/'+id);
  }

  addAuthor(newAuthor){
    console.log("NEW TASK INSIDE HTTP SERVICE", newAuthor)
    return this._http.post('/authors_json/new', newAuthor);
  }

  deleteAuthor(id){
    return this._http.delete("/authors_json/"+id);
  }
  updateAuthor(author_id, newName){
    return this._http.put("/authors_json/"+author_id, newName)
  }
}

