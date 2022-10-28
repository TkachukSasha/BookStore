import {Book} from "./book";
import {createReducer} from "@ngrx/store";

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
  initialState
)
