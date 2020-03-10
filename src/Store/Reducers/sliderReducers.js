import { GET_RECORDS, GET_RECORD_DETAILS } from '../Actions/sliderAction';
import { store } from '../initialState';

export const sliderReducers = (state = store, action) => {
  switch (action.type) {
    case GET_RECORDS:
      const sliderData = {
        showLoader: false,
        data: action.payload,
      };
      return { ...state, slider: sliderData };

    case GET_RECORD_DETAILS:
      const individualRecordData = {
        showLoader: false,
        data: [action.payload]
      };
      return { ...state, sliderDesc: individualRecordData };

    default:
      return state;
  }
};
