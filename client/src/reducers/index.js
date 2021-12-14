/*
здесь хранятся функции, которые принимают состояние и действие
возвращают новое состояние

combineReducers - специальная функция, 	
которая помогает разбивать один большой reducer на 
несколько маленьких.
*/

import { combineReducers } from "redux";
import messageReducer from "./messageReducer";

//rootReducer, передаем первым параметром в store
const rootReducer = combineReducers({
  chat: messageReducer,
});

export default rootReducer;
