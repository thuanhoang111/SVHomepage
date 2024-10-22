import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/auth-saga";

/**
 * Root saga that combines all individual sagas.
 *
 * @function rootSaga
 * @yields {Generator} A generator function that forks the authSaga.
 */
export default function* rootSaga() {
  yield all([fork(authSaga)]);
}
