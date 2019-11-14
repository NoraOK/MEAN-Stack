import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient){
    //  this.getTasks();
    //  this.getOneTask(id);
   }
  getTasks(){
    return this._http.get('/tasks');
  }

  getOneTask(id){
    return this._http.get('/tasks/'+id);
  }

  addTask(newTask){
    console.log("NEW TASK INSIDE HTTP SERVICE", newTask)
    return this._http.post('/tasks/new', newTask);
  }

  deleteTask(id){
    return this._http.delete("/tasks/delete/"+id);
  }

  updateTask(editTask){
    return this._http.put('/tasks/update/'+editTask._id, editTask);
  }

 


}


