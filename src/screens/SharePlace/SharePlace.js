import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';


class SharePlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        placeName: {
          value: '',
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true,
          }
        },
        location: {
          value: null,
          valid: false,
        },
        image: {
          value: null,
          valid: false,
        },
      }
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  static navigatorStyle = {
    navBarButtonColor: 'orange',
  };

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left',
        });
      }
    }
  };

  placeNameChangeHandler = (value) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value,
            valid: validate(value, prevState.controls.placeName.validationRules),
            touched: true,
          }
        }
      };
    });
  };

  locationPickedHandler = (location) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true,
          }
        }
      };
    });
  };

  imagePickedHandler = (image) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true,
          }
        }
      };

    });
  };

  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value,
    );
  };

  render() {
    let submitButton = (
      <Button
        title="Share the Place!"
        onPress={ this.placeAddedHandler }
        disabled={
          !this.state.controls.placeName.valid
          || !this.state.controls.location.valid
          || !this.state.controls.image.valid
        }
      />
    );

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }
    return (
      <ScrollView>
        <KeyboardAvoidingView
          behavior='padding'
          style={ styles.container }
        >
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage onImagePicked={ this.imagePickedHandler }/>
          <PickLocation
            onLocationPick={ this.locationPickedHandler }
          />
          <PlaceInput
            placeData={ this.state.controls.placeName }
            onChangeText={ this.placeNameChangeHandler }
          />
          <View style={ styles.button }>
            { submitButton }
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150,
  },
  button: {
    margin: 8,
  },
});

const mapStateToProps = (state) => {
  return {
    isLoading: state.ui.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
