import {takeLatest, takeEvery} from 'redux-saga/effects';

export default function* rootSaga() {
  yield takeLatest('fetch_list', fetchUsers);
}