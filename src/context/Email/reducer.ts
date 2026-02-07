import {
  EmailState,
  EmailAction,
  SEND_EMAIL_LOADING,
  SEND_EMAIL_SUCCESS,
  FETCH_EMAIL_HISTORY_LOADING,
  FETCH_EMAIL_HISTORY_SUCCESS,
  FETCH_TEMPLATES_LOADING,
  FETCH_TEMPLATES_SUCCESS,
} from "./types";

export const initialState: EmailState = {
  sendLoading: false,
  historyLoading: false,
  templatesLoading: false,
  history: {
    data: [],
    total: 0,
    page: 1,
    totalPages: 1,
  },
  templates: [],
};

export const emailReducer = (
  state: EmailState,
  action: EmailAction,
): EmailState => {
  switch (action.type) {
    case SEND_EMAIL_LOADING:
      return { ...state, sendLoading: action.payload };
    case SEND_EMAIL_SUCCESS:
      return { ...state, sendLoading: false };
    case FETCH_EMAIL_HISTORY_LOADING:
      return { ...state, historyLoading: action.payload };
    case FETCH_EMAIL_HISTORY_SUCCESS:
      return {
        ...state,
        history: {
          data: action.payload.data,
          total: action.payload.meta.total,
          page: action.payload.meta.page,
          totalPages: action.payload.meta.totalPages,
        },
        historyLoading: false,
      };
    case FETCH_TEMPLATES_LOADING:
      return { ...state, templatesLoading: action.payload };
    case FETCH_TEMPLATES_SUCCESS:
      return { ...state, templates: action.payload, templatesLoading: false };
    default:
      return state;
  }
};
