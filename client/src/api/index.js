/*
api - умеет работать с интерфейсом
здесь формируются запросы
*/

//axios - http-клиент, отправляет запросы на сервер
import axios from "axios";

//библиотека с веб-сокетами для клиента
import { io } from "socket.io-client";

//базовая урла и события сокетов
import { BASE_URL, SOCKET_EVENTS } from "../constans";

//хранилище всех состояний
import store from "../store";

//все действия для создания сообщений
import * as MessageActionCreators from "../actions/messagesActionCreators";

//создаем базовый запрос на сервер
const httpClient = axios.create({
  baseURL: `http:${BASE_URL}`,
});

/*
получаем сокет (отдельный клиент) по базовой урле
ws - это протокол веб-сокет
*/
const socket = io(`ws://${BASE_URL}`);

//запрос на получение всех сообщений по http, асинхронная функция
export const getMessages = async () => httpClient.get("/");

/*
отправляем запрос на создание сообщение по веб-сокету и рассылку всем
передаем событие и сообщение
*/
export const createMessage = async (message) => {
  socket.emit(SOCKET_EVENTS.NEW_MESSAGE, message);
};

/*
на сокете ловим событие и отправляем в редакс: 
обновляем store, передавая в него функция создания сообщения, 
которая в свою очередь принимает новое сообщение 
*/
socket.on(SOCKET_EVENTS.NEW_MESSAGE, (newMessage) => {
  console.log(newMessage.data);
  store.dispatch(MessageActionCreators.createMessageSuccess(newMessage.data));
});

//событие ошибки
socket.on(SOCKET_EVENTS.NEW_MESSAGE_ERROR, (error) => {
  store.dispatch(MessageActionCreators.createMessageError(error));
});
