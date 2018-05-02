import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';

const initialState = {
  places: [],
  selectedPlace: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: String(Math.random()),
          name: action.placeName,
          image: {
            uri: 'https://sun9-17.userapi.com/c840720/v840720064/792a6/4dvdKe-m3N8.jpg',
          },
        }),
      };

    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter((place) => place.key !== state.selectedPlace.key),
        selectedPlace: null,
      };

    default:
      return state;
  }
};

export default reducer;
