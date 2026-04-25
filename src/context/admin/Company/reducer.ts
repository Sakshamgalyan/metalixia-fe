import { CompanyState, CompanyAction } from './type';

export const initialCompanyState: CompanyState = {
  listData: null,
  listLoading: false,
  page: 1,
  modal: {
    mode: null,
    selectedItem: null,
  },
  actionLoading: false,
};

export const companyReducer = (
  state: CompanyState,
  action: CompanyAction,
): CompanyState => {
  switch (action.type) {
    case 'FETCH_COMPANY_LIST_LOADING':
      return { ...state, listLoading: action.payload };
    case 'FETCH_COMPANY_LIST_SUCCESS':
      return { ...state, listData: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_MODAL':
      return { ...state, modal: action.payload };
    case 'ACTION_LOADING':
      return { ...state, actionLoading: action.payload };
    case 'ACTION_SUCCESS':
      return { ...state, modal: { mode: null, selectedItem: null } };
    case 'TOGGLE_COMPANY_STATUS':
      if (!state.listData) return state;
      return {
        ...state,
        listData: {
          ...state.listData,
          data: state.listData.data.map((company) =>
            company._id === action.payload
              ? { ...company, isActive: !company.isActive }
              : company,
          ),
        },
      };
    default:
      return state;
  }
};
