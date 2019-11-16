import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: any;
  oneAuthor: any = {name: ""}

  constructor(    
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id']

  });
    this.getOneAuthor(this.id)
  }

  getOneAuthor(id){
    let observable = this._httpService.findAuthor(id);
    observable.subscribe(data => {
      console.log("Got nora's one author!", data)
      this.oneAuthor = data;
    })
  }

  updateAuthor(author){
    let observable = this._httpService.updateAuthor(author._id, author)
    observable.subscribe(data => {
      console.log('GOT BACK AUTHOR UPDATE DATA: ', data)
      this.oneAuthor = {name:""}
      this.goHome()
    })
  }

  goHome() {
    this._router.navigate(['/index']);
  }


}
