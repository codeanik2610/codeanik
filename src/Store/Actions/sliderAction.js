
import { GET_SLIDER_DETAILS_URL, GET_RECORD_DETAILS_URL } from '../../Constants/sliderDetails';
export const GET_RECORDS = 'GET_RECORDS';
export const GET_RECORD_DETAILS = 'GET_RECORD_DETAILS';

export const getAllSlides = () => {
  return (dispatch) => {
    fetch(GET_SLIDER_DETAILS_URL)
      .then(res => res.json())
      .then(res => {
        dispatch({ type: GET_RECORDS, payload: res })
      })
  };
};

export const getImageDetails = imageId => {
  return (dispatch) => {
    fetch(`${GET_RECORD_DETAILS_URL}=${imageId}`)
      .then(res => res.json())
      .then(res => {
        dispatch({ type: GET_RECORD_DETAILS, payload: res })
      });
  };
};