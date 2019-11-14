import { HttpService } from './http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _httpService: HttpService) { }
  // ngOnInit will run when the component is initialized, after the constructor method.
  tasks:any = [];
  oneTask:any;
  newTask: any;
  editTask:any;

  ngOnInit(){
    // this.getOneTaskFromService();
    this.newTask = {title: "", description: ""}
  }
  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got noras tasks!", data)
      this.tasks = data;
      
    });
  }
  showTask(task){
    let observable = this._httpService.getOneTask(task._id);
    observable.subscribe(data => {
      console.log("Got nora's one task!", data)
      this.oneTask = data;
    })
  }
  
  onSubmit(){
    console.log(this.newTask)
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      console.log("Got noras tasks!", data)
      this.newTask = {title: "", description:""}
      this.getTasksFromService();
    })
  }

  removeTask(id){
    let observable = this._httpService.deleteTask(id);
    observable.subscribe(data => {
      console.log("Got noras tasks!", data)
      this.getTasksFromService();
    });
  }
  showEditForm(task){
    this.editTask = task
  }

  updateTask(){
    let observable = this._httpService.updateTask(this.editTask);
    observable.subscribe(data=>{
      this.editTask = null
    })

  }
  // getOneTaskFromService(){
  //   let observable = this._httpService.getOneTask("5dc5f0a2c1e1ba03addd011c");
  //   observable.subscribe(data => {
  //     // console.log("Got noras tasks!", data)
  //     this.thirdTask = data
  //   });
  // }
}
