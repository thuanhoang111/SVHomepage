import createSagaMiddleware from "@redux-saga/core";
import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import rootSaga from "./rootSaga";

// Combines all reducers into a single reducer.
const reducer = combineReducers({
  auth: authReducer,
});

// Creates Redux-Saga middleware instance.
const sagaMiddleWare = createSagaMiddleware();

// Configures the Redux store with reducers and middleware.
export const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(sagaMiddleWare),
  // Uncomment to add logger middleware
  // middleware: (gDM) => gDM().concat(logger, sagaMiddleWare),
});

// Runs the root saga using the saga middleware.
sagaMiddleWare.run(rootSaga);

// Type representing the application's dispatch function.
export type AppDispatch = typeof store.dispatch;

// Type representing the root state of the application.
export type RootState = ReturnType<typeof store.getState>;

// Type representing a thunk action.
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
