import { put } from "redux-saga/effects";
import * as MessagesActionCreators from "../actions/messagesActionCreators";
import * as API from "../api";

/*
функция-генератор
здесь отправляем запрос на сервер
в action.payload хранятся данные о сообщении, которое мы создаем
put - кладет новый action
*/

export function* createMessageSaga(action) {
  try {
    yield API.createMessage(action.payload.message);
  } catch (error) {
    yield put(MessagesActionCreators.createMessageError(error));
  }
}

export function* getMessagesSaga(action) {
  try {
    const { data: message } = yield API.getMessages();

    yield put(MessagesActionCreators.getMessagesSuccess(message));
  } catch (error) {
    yield put(MessagesActionCreators.getMessagesError(error));
  }
}
