//КОНСТАНТЫ

/*
события сокетов. такие же события лежат на сервере. 
объединить не получится, т.к. они могут лежать на разных компах

базовая урла
*/

export const SOCKET_EVENTS = {
  NEW_MESSAGE: "newMessage",
  NEW_MESSAGE_ERROR: "newMessageError",
};

export const BASE_URL = `localhost:3000`;
