import {AppState} from "./app.state";
import {createReducer} from "@ngrx/store";
import {setApiStatus} from "./app.action";
import {on} from "@ngrx/store";


export const initialState: AppState ={
  apiStatus: "",
  apiResponse: ""
}

export const appReducer = createReducer(
  initialState,
  on(setApiStatus, (state, {apiStatus}) => {
    return apiStatus;
  })
)
