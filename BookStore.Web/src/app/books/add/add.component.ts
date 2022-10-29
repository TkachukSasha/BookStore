import { Component, OnInit } from '@angular/core';
import {Book} from "../store/book";
import {select, Store} from "@ngrx/store";
import {invokeSaveBookApi} from "../store/books.action";
import {AppState} from "../../shared/store/app.state";
import {selectAppState} from "../../shared/store/app.selector";
import {Router} from "@angular/router";
import {setApiStatus} from "../../shared/store/app.action";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  bookForm: Book = {
    id : 0,
    title: "",
    author: "",
    price : 0
  }

  constructor(private store: Store,
              private appStore: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {
  }

  saveBook(){
    this.store.dispatch(invokeSaveBookApi({payload: {...this.bookForm}}));
    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if(data.apiStatus === "success"){
        this.appStore.dispatch(setApiStatus({apiStatus:{apiStatus: "", apiResponse : ""}}))
        this.router.navigate(["/"]);
      }
    })
  }
}
