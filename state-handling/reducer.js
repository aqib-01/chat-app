export const reducer = (state, action) => {
  if (action.type === "SET_MODAL_TEXT") {
    return {
      ...state,
      feedbackModal: {
        isOpen: true,
        text: action.payload,
      },
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      feedbackModal: {
        ...state.feedbackModal,
        isOpen: false,
      },
    };
  }
  if (action.type === "SET_NEW_MESSAGE") {
    return {
      ...state,
      messages: [...state.messages, action.payload],
    };
  }
  if (action.type === "SET_ALL_MESSAGES") {
    return {
      ...state,
      messages: [...action.payload],
    };
  }
  if (action.type === "SET_MSG_STATUS") {
    return {
      ...state,
      msgStatus: {
        isOpen: true,
        text: action.payload,
      },
    };
  }
  if (action.type === "CLOSE_MSG_STATUS") {
    return {
      ...state,
      msgStatus: {
        ...state.msgStatus,
        isOpen: false,
      },
    };
  }
};
