import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {selectBooks} from "../store/books.selector";
import {invokeBooksApi, invokeDeleteBookApi} from "../store/books.action";
import {setApiStatus} from "../../shared/store/app.action";
import {AppState} from "../../shared/store/app.state";
import {Router} from "@angular/router";
import {selectAppState} from "../../shared/store/app.selector";

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store,
              private appStore: Store<AppState>,
              private router: Router) { }

  books$ = this.store.pipe(select(selectBooks));
  deleteModal: any;
  idToDelete: number = 0;

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById(("deleteModal"))
    );

    this.store.dispatch(invokeBooksApi());
  }

  openDeleteModal(id: number){
    this.idToDelete = id;
    this.deleteModal.show();
  }

  confirmDelete(){
    this.store.dispatch(invokeDeleteBookApi({id: this.idToDelete}));
    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if(data.apiStatus === "success") {
        this.appStore.dispatch(setApiStatus({apiStatus: {apiStatus: "", apiResponse: ""}}));
        this.deleteModal.hide();
      }
    });
  }
}
