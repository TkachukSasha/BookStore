import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BooksService} from "../services/books.service";
import {booksFetchAPISuccess, invokeBooksApi} from "./books.action";
import {map, switchMap} from "rxjs";

@Injectable()
export class BooksEffects {

  constructor(private actions$:Actions,
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
}
