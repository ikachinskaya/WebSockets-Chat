import { createStore, applyMiddleware } from "redux";
import createSagaMW from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

/*
sagaMW - промежуточная функция для поключения саги к хранилищу
создаем сагу
*/
const sagaMW = createSagaMW();

/*
создаем хранилище для всех состояний
менять можно только dispatch(action)
composeWithDevTools - чтобы подключить devtools для redux
*/
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMW))
);

//запускаем промежуточную сагу и передаем ей функцию-генератор rootSaga
sagaMW.run(rootSaga);

export default store;
