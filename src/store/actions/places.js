import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => {
  return (dispatch) => {
    fetch('https://us-central1-react-native-awe-1526404146569.cloudfunctions.net/storeImage', {
      method: 'POST',
      body: JSON.stringify({
        image: image.base64,
      }),
    })
      .catch(error => console.log(error))
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location,
          image: parsedRes.imageUrl,
        };
        return fetch('https://react-native-awe-1526404146569.firebaseio.com/places.json', {
          method: 'POST',
          body: JSON.stringify(placeData),
        })
          .catch((error) => console.log(error))
          .then((res) => res.json())
          .then((parsedRes) => {
            console.log(parsedRes);
          });
      });
  };
};

export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    placeKey: key,
  };
};
