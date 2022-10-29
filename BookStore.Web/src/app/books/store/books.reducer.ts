import {Book} from "./book";
import {createReducer,on} from "@ngrx/store";
import {booksFetchAPISuccess, deleteBookApiSuccess, saveBookAPISuccess, updateBookAPISuccess} from "./books.action";

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
  initialState,
  on(booksFetchAPISuccess, (state, {allBooks}) => {
    return allBooks;
  }),
  on(saveBookAPISuccess, (state, {response}) => {
    let newState = [...state];
    newState.unshift((response))
    return newState;
  }),
  on(updateBookAPISuccess, (state, {response}) => {
    let newState = state.filter(_ => _.id !== response.id);
    newState.unshift(response);
    return newState;
  }),
  on(deleteBookApiSuccess, (state, {id}) => {
    let newState = state.filter(_ => _.id !== id);
    return newState;
  })
)
