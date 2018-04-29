import React, { Component } from 'react';
import { StyleSheet, View, YellowBox } from 'react-native';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import placeImage from './src/assets/4dvdKe-m3N8.jpg';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    };

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
  }

  placeAddedHandler = (placeName) => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: String(Math.random()),
          name: placeName,
          // image: placeImage,
          image: {
            uri: 'https://sun9-17.userapi.com/c840720/v840720064/792a6/4dvdKe-m3N8.jpg',
          },
        }),
      };
    });
  };

  placeDeletedHandler = (key) => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter((place) => place.key !== key),
      };
    });
  };

  render() {

    return (
      <View style={ styles.container }>
        <PlaceInput onPlaceAdded={ this.placeAddedHandler }/>
        <PlaceList
          places={ this.state.places }
          onItemDeleted={ this.placeDeletedHandler }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
