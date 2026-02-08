export const SEND_EMAIL_LOADING = "SEND_EMAIL_LOADING";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const FETCH_EMAIL_HISTORY_LOADING = "FETCH_EMAIL_HISTORY_LOADING";
export const FETCH_EMAIL_HISTORY_SUCCESS = "FETCH_EMAIL_HISTORY_SUCCESS";
export const FETCH_TEMPLATES_LOADING = "FETCH_TEMPLATES_LOADING";
export const FETCH_TEMPLATES_SUCCESS = "FETCH_TEMPLATES_SUCCESS";

export interface EmailHistoryItem {
  _id: string;
  to: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface EmailTemplateItem {
  _id: string;
  name: string;
  subject: string;
  body: string;
}

export interface EmailState {
  sendLoading: boolean;
  historyLoading: boolean;
  templatesLoading: boolean;
  history: {
    data: EmailHistoryItem[];
    total: number;
    page: number;
    totalPages: number;
  };
  templates: EmailTemplateItem[];
}

export type EmailAction =
  | { type: typeof SEND_EMAIL_LOADING; payload: boolean }
  | { type: typeof SEND_EMAIL_SUCCESS }
  | { type: typeof FETCH_EMAIL_HISTORY_LOADING; payload: boolean }
  | { type: typeof FETCH_EMAIL_HISTORY_SUCCESS; payload: any }
  | { type: typeof FETCH_TEMPLATES_LOADING; payload: boolean }
  | { type: typeof FETCH_TEMPLATES_SUCCESS; payload: EmailTemplateItem[] };
