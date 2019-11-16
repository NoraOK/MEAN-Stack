import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  authors: any


  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAuthorsFromService()
  }
  getAuthorsFromService(){
    let observable = this._httpService.getAuthors();
    observable.subscribe((data:any[]) => {
      console.log("Got noras authors!", data)
      for(var author of data){
        console.log(author)
        author.newName = {name: ''}
      }
      this.authors = data;
    });
  }

  deleteAuthorFromService(id){
    let observable = this._httpService.deleteAuthor(id);
    observable.subscribe((data)=>{
      console.log("deleting author", data)
      this.getAuthorsFromService()
    })
    

  }
}
