import { Formik, Form, Field } from "formik";
import { useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as MessageActionCreators from "./actions/messagesActionCreators";

function App() {
  //получаем значения из хранилища
  const { messages, isLoading, error } = useSelector((state) => state.chat);

  //получаем функцию dispatch из хранилища
  const dispatch = useDispatch();

  /*
  bindActionCreators принимает MessageActionCreators и dispatch
  и возвращает объект с функциями - генераторами экшенов, которые уже обернуты в dispatch, 
  т.е. они могут вызываться напрямую
  */
  const { getMessagesRequest, createMessageRequest } = bindActionCreators(
    MessageActionCreators,
    dispatch
  );

  /*побочные эффекты
  получаем все сообщения
  */
  useEffect(() => {
    getMessagesRequest();
  }, []);

  /*
  скролл для чата
  происходит, когда меняется сообщение
  */
  useLayoutEffect(() => {
    document.title = "Main page";
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div>
      <ul>
        {isLoading && "LOADING"}
        {messages.map((msg) => {
          return (
            <li
              key={msg._id}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h1 style={{ fontSize: "16px", paddingRight: "10px" }}>
                {msg.user.name || "Anon"}
              </h1>
              <p>{msg.text}</p>
            </li>
          );
        })}
      </ul>
      <Formik
        initialValues={{ text: "", name: "" }}
        onSubmit={(values, formikBag) => {
          createMessageRequest(values);
          formikBag.setFieldValue("text", "");
        }}
      >
        <Form>
          <Field name="text" placeholder="text" />
          <Field name="name" placeholder="name" />
          <button type="submit">Send Message</button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
