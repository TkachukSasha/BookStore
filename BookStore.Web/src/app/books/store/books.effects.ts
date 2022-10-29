import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BooksService} from "../services/books.service";
import {
  booksFetchAPISuccess, deleteBookApiSuccess,
  invokeBooksApi, invokeDeleteBookApi,
  invokeSaveBookApi,
  invokeUpdateBookApi,
  saveBookAPISuccess, updateBookAPISuccess
} from "./books.action";
import {map, switchMap} from "rxjs";
import {AppState} from "../../shared/store/app.state";
import {Store} from "@ngrx/store";
import {setApiStatus} from "../../shared/store/app.action";

@Injectable()
export class BooksEffects {

  constructor(private actions$:Actions,
              private appStore: Store<AppState>,
              private bookService:BooksService) {
  }

  loadAllBooks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(invokeBooksApi),
        switchMap(() => {
          return this.bookService.getAllBooks()
            .pipe(
              map((data) => booksFetchAPISuccess({allBooks: data}))
            )
        })
      )
  )

  saveBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeSaveBookApi),
      switchMap((action) => {
        this.appStore.dispatch(setApiStatus({apiStatus:{apiResponse: "", apiStatus: ""}}))
        return this.bookService.saveBook(action.payload)
          .pipe(map((data) => {
            this.appStore.dispatch(setApiStatus({apiStatus:{apiResponse: "", apiStatus: "success"}}))
            return saveBookAPISuccess({response:data});
          }))
      })
    )
  )

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUpdateBookApi),
      switchMap((action) => {
        this.appStore.dispatch(setApiStatus({apiStatus:{apiResponse: "", apiStatus: ""}}))
        return this.bookService.updateBook(action.payload)
          .pipe(map((data) => {
            this.appStore.dispatch(setApiStatus({apiStatus:{apiResponse: "", apiStatus: "success"}}));
            return updateBookAPISuccess({response:data});
          }))
      })
    )
  )

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeDeleteBookApi),
      switchMap((action) => {
        this.appStore.dispatch(setApiStatus({apiStatus:{apiResponse: "", apiStatus: ""}}))
        return this.bookService.deleteBook(action.id)
          .pipe(map((data) => {
            this.appStore.dispatch(setApiStatus({apiStatus:{apiResponse: "", apiStatus: "success"}}));
            return deleteBookApiSuccess({id: action.id});
          }))
      })
    )
  )
}
