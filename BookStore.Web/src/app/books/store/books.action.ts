import {createAction, props} from "@ngrx/store";
import {Book} from "./book";

export const  invokeBooksApi = createAction(
  "[Books API] invoke books Fetch API"
)

export const booksFetchAPISuccess = createAction(
  "[Books API] fetch api success",
  props<{allBooks:Book[]}>()
)
