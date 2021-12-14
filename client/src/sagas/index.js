/*
здесь хранятся побочные эффекты - запросы на сервер
*/
import { takeEvery } from "redux-saga/effects";

import ACTIONS from "../actions";
import { createMessageSaga, getMessagesSaga } from "./messagesSaga";

/*
функция-генератор

yield - используется для остановки и возобновления функций-генераторов

takeLatest - позволяет одновременно запускать только один обработчик функции.
1 параметр - действие, которое он ловит
2 параметр - сага, которая будет запускаться

Если другое действие запускается, когда обработчик все еще работает, 
он отменяет его и запускается снова с последними доступными данными.
*/
export default function* rootSaga() {
  yield takeEvery(ACTIONS.CREATE_MESSAGE_REQUEST, createMessageSaga);
  yield takeEvery(ACTIONS.GET_MESSAGES_REQUEST, getMessagesSaga);
}
