import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newAuthor: any= {name: ""};

  constructor(
    private _httpService: HttpService,
    private _router: Router
    ) { }

  ngOnInit() {
  }
  createAuthorsFromService(){
    console.log(this.newAuthor)
    let observable = this._httpService.addAuthor(this.newAuthor);
    observable.subscribe(data => {
      console.log("Got noras tasks!", data)
      this.goHome();
    })
  }

  goHome() {
    this._router.navigate(['/index']);
  }
}
