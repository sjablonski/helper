import {
  FETCH_ENTRIES_SUCCESS,
  FETCH_ENTRY_DETAILS_SUCCESS,
  ADD_ENTRY_REQUEST,
  ADD_ENTRY_SUCCESS,
  ADD_ENTRY_FAILURE,
  CLEAR_ENTRIES,
  UPDATE_ENTRIES,
  CANCEL_ENTRY_SUCCESS,
} from 'constants/actionType';

const initState = { entries: [], details: null, lastId: null, isSuccess: false };

const entryReducer = (state = initState, action) => {
  const { entries, details, lastId } = state;
  const { type, payload } = action;
  switch (type) {
    case FETCH_ENTRIES_SUCCESS: {
      const newReportList = [...entries, ...payload];
      const newLastId = newReportList.length ? newReportList[newReportList.length - 1].reportId : lastId;
      return {
        ...state,
        entries: newReportList,
        lastId: newLastId,
      };
    }
    case FETCH_ENTRY_DETAILS_SUCCESS:
      return { ...state, details: action.payload };

    case UPDATE_ENTRIES: {
      const updateentries = entries.map(item => {
        if (item.reportId === payload.reportId) {
          return payload;
        }
        return item;
      });
      return { ...state, entries: updateentries };
    }

    case CANCEL_ENTRY_SUCCESS:
      return { ...state, details: { ...details, status: 'cancel' } };

    case ADD_ENTRY_SUCCESS: {
      return payload ? { ...state, entries: [payload, ...entries] } : { ...state, isSuccess: true };
    }
    case ADD_ENTRY_REQUEST:
    case ADD_ENTRY_FAILURE:
      return { ...state, isSuccess: false };
    case CLEAR_ENTRIES:
      return {
        entries: [],
        details: null,
        lastId: null,
        isSuccess: false,
      };
    default:
      return state;
  }
};

export default entryReducer;
