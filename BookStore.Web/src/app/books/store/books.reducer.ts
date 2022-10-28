import {Book} from "./book";
import {createReducer,on} from "@ngrx/store";
import {booksFetchAPISuccess} from "./books.action";

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
  initialState,
  on(booksFetchAPISuccess, (state, {allBooks}) => {
    return allBooks;
  })
)
