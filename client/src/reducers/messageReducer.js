import ACTIONS from "../actions";

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

function messageReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.GET_MESSAGES_REQUEST:
    case ACTIONS.CREATE_MESSAGE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ACTIONS.GET_MESSAGES_ERROR:
    case ACTIONS.CREATE_MESSAGE_ERROR: {
      const {
        payload: { error },
      } = action;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case ACTIONS.CREATE_MESSAGE_SUCCESS: {
      const {
        payload: { message },
      } = action;
      const { messages } = state;
      return {
        ...state,
        isLoading: false,
        messages: [...messages, message],
      };
    }

    case ACTIONS.GET_MESSAGES_SUCCESS: {
      const {
        payload: { messages: newMessages },
      } = action;
      const { messages } = state;
      return {
        ...state,
        isLoading: false,
        messages: [...messages, ...newMessages],
      };
    }

    default:
      return state;
  }
}

export default messageReducer;
