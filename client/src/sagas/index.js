import {takeEvery} from 'redux-saga/effects';

import ACTIONS from '../actions'
import { createMessageSaga, getMessagesSaga } from './messagesSaga';

export default function *rootSaga(){
  yield takeEvery(ACTIONS.CREATE_MESSAGE_REQUEST, createMessageSaga);
  yield takeEvery(ACTIONS.GET_MESSAGES_REQUEST, getMessagesSaga);
}

