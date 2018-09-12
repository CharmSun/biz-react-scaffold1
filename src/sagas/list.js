import { put, call } from 'redux-saga/effects';
import {getList} from '../services'

export function* fetchList() {
  try {
    yield put();
    const data = yield call(getList);
    yield put();
  } catch (err) {
    yield put()
  }
}