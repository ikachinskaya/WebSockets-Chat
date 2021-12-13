import axios from "axios";
import { io } from "socket.io-client";
import { BASE_URL, SOCKET_EVENTS } from "../constans";
import store from "../store";
import * as MessageActionCreators from "../actions/messagesActionCreators";

const httpClient = axios.create({
  baseURL: `http:${BASE_URL}`,
});

const socket = io(`ws://${BASE_URL}`);

export const getMessages = async () => httpClient.get("/");

export const createMessage = async (message) => {
  socket.emit(SOCKET_EVENTS.NEW_MESSAGE, message);
};

socket.on(SOCKET_EVENTS.NEW_MESSAGE, (newMessage) => {
  console.log(newMessage.data);
  store.dispatch(MessageActionCreators.createMessageSuccess(newMessage.data));
  
});

socket.on(SOCKET_EVENTS.NEW_MESSAGE_ERROR, (error) => {
  store.dispatch(MessageActionCreators.createMessageError(error));
});
