import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultImport from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      respStyles: {
        pwContainerDirection: 'column',
        pwContainerJustifyContent: 'flex-start',
        pwWrapperWidth: '100%',
      }
    };

    Dimensions.addEventListener('change', (dims) => {
      const isDimensionsMore = Dimensions.get('window').height > 500;

      this.setState({
        respStyle: {
          pwContainerDirection: isDimensionsMore ? 'column' : 'row',
          pwContainerJustifyContent: isDimensionsMore ? 'flex-start' : 'space-between',
          pwWrapperWidth: isDimensionsMore ? '100%' : '45%',
        },
      });
    });
  }

  loginHandler = () => {
    startMainTabs();
  };

  render() {
    let headingText = null;

    if (Dimensions.get('window').height > 500) {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }

    return (
      <ImageBackground
        source={ backgroundImage }
        style={ styles.backgroundImage }
      >
        <View style={ styles.container }>
          { headingText }
          <ButtonWithBackground color="#29aaf4" onPress={ () => alert('Hello') }>Switch to Login</ButtonWithBackground>
          <View style={ styles.inputContainer }>
            <DefaultImport placeholder="Your E-Mail Address" style={ styles.input }/>
            <View style={ {
              flexDirection: this.state.respStyles.pwContainerDirection,
              justifyContent: this.state.respStyles.pwContainerJustifyContent,
            } }>
              <View style={ {
                width: this.state.respStyles.pwWrapperWidth,
              } }>
                <DefaultImport placeholder="Password" style={ styles.input }/>
              </View>
              <View style={ {
                width: this.state.respStyles.pwWrapperWidth,
              } }>
                <DefaultImport placeholder="Confirm Password" style={ styles.input }/>
              </View>
            </View>
          </View>
          <ButtonWithBackground
            onPress={ this.loginHandler }
            color="#29aaf4"
          >
            Submit
          </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb',
  },
  passwordContainer: {
    flexDirection: Dimensions.get('window').height > 500 ? 'column' : 'row',
    justifyContent: 'space-between',
  },
  passwordWrapper: {
    width: Dimensions.get('window').height > 500 ? '100%' : '45%',
  },
});

export default AuthScreen;
