import { Component, OnInit } from '@angular/core';
import {Book} from "../store/book";
import {select, Store} from "@ngrx/store";
import {seletBookById} from "../store/books.selector";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {invokeUpdateBookApi} from "../store/books.action";
import {selectAppState} from "../../shared/store/app.selector";
import {setApiStatus} from "../../shared/store/app.action";
import {AppState} from "../../shared/store/app.state";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  bookForm: Book = {
    id : 0,
    title: "",
    author: "",
    price : 0
  }

  constructor(private store: Store,
              private route: ActivatedRoute,
              private router: Router,
              private appStore: Store<AppState>) { }

  ngOnInit(): void {
    let fetchFromData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        let id = Number(param.get("id"));
        return this.store.pipe(select(seletBookById(id)));
      })
    )

    fetchFromData$.subscribe((data) => {
      if(data){
        this.bookForm = {...data};
      }
      else{
        this.router.navigate(["/"]);
      }
    })
  }

  updateBook(){
      this.store.dispatch(invokeUpdateBookApi({payload : {...this.bookForm}}));
      let appStatus$ = this.appStore.pipe(select(selectAppState));
      appStatus$.subscribe((data) => {
        if(data.apiStatus === "success"){
          this.appStore.dispatch(setApiStatus({apiStatus:{apiStatus: "", apiResponse : ""}}))
          this.router.navigate(["/"]);
       }
    });
  }
}
