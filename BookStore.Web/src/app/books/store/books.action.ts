import {createAction, props} from "@ngrx/store";
import {Book} from "./book";

export const  invokeBooksApi = createAction(
  "[Books API] invoke books Fetch API"
)

export const booksFetchAPISuccess = createAction(
  "[Books API] fetch api success",
  props<{allBooks:Book[]}>()
)

export const invokeSaveBookApi = createAction(
  "[Books API] invoke save book API",
  props<{payload:Book}>()
)

export const saveBookAPISuccess = createAction(
  "[Books API] save book api success",
  props<{response:Book}>()
)

export const invokeUpdateBookApi = createAction(
  "[Books API] invoke update book API",
  props<{payload:Book}>()
)

export const updateBookAPISuccess = createAction(
  "[Books API] update book api success",
  props<{response:Book}>()
)

export const invokeDeleteBookApi = createAction(
  "[Book API] invoke delete book API",
  props<{id: number}>()
)

export const deleteBookApiSuccess = createAction(
  "[Books API] delete book api success",
  props<{id: number}>()
)
