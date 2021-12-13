import ACTIONS from ".";

export function createMessageRequest(message) {
  return {
    type: ACTIONS.CREATE_MESSAGE_REQUEST,
    payload: { message },
  };
}

export function createMessageSuccess(message) {
  return {
    type: ACTIONS.CREATE_MESSAGE_SUCCESS,
    payload: { message },
  };
}

export function createMessageError(error) {
  return {
    type: ACTIONS.CREATE_MESSAGE_ERROR,
    payload: { error },
  };
}

export function getMessagesRequest(messages) {
  return {
    type: ACTIONS.GET_MESSAGES_REQUEST,
    payload: { messages },
  };
}

export function getMessagesSuccess(messages) {
  return {
    type: ACTIONS.GET_MESSAGES_SUCCESS,
    payload: { messages },
  };
}

export function getMessagesError(error) {
  return {
    type: ACTIONS.GET_MESSAGES_ERROR,
    payload: { error },
  };
}
