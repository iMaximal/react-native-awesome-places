import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions/index';


class PlaceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: 'portrait',
    };

    Dimensions.addEventListener('change', this.updateStyle);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyle);
  }

  updateStyle = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape',
    });
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop({
      animated: true,
      animationType: 'fade',
    });
  };

  render() {
    return (
      <View style={ [
        styles.container,
        this.state.viewMode === 'portrait'
          ? styles.portraitContainer
          : styles.landscapeContainer
      ] }>
        <View style={ styles.subContainer }>
          <Image
            source={ this.props.selectedPlace.image }
            style={ styles.placeImage }
          />
        </View>
        <View style={ styles.subContainer }>
          <View>
            <Text style={ styles.placeName }>{ this.props.selectedPlace.name }</Text>
          </View>
          <View style={ styles.deleteButton }>
            <TouchableOpacity onPress={ this.placeDeletedHandler }>
              <View>
                <Icon
                  size={ 30 }
                  name={ Platform.OS === 'android' ? 'md-trash' : 'ios-trash' }
                  color="red"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1,
  },
  portraitContainer: {
    flexDirection: 'column',
  },
  landscapeContainer: {
    flexDirection: 'row',
  },
  placeImage: {
    width: '100%',
    height: 200,
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
  },
  deleteButton: {
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key)),
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
