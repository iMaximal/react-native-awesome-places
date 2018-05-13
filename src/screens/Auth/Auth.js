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
      viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
      controls: {
        email: {
          value: '',
          valid: false,
          validationRules: {
            isEmail: true,
          }
        },
        password: {
          value: '',
          valid: false,
          validationRules: {
            minLength: 6,
          }
        },
        confirmPassword: {
          value: '',
          valid: false,
          validationRules: {
            equalTo: 'password',
          }
        },
      },
    };

    Dimensions.addEventListener('change', this.updateStyle);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyle)
  }

  updateStyle = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape',
    });
  };

  loginHandler = () => {
    startMainTabs();
  };

  render() {
    let headingText = null;

    if (this.state.viewMode === 'portrait') {
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
          <ButtonWithBackground color="#29aaf4" onPress={ () => alert('Hello') }>Switch to Login</ButtonWithBackground>
          <View style={ styles.inputContainer }>
            <DefaultImport
              placeholder="Your E-Mail Address"
              style={ styles.input }
              value={this.state.controls.email.value}
            />
            <View style={
              this.state.viewMode === 'portrait'
                ? styles.portraitPasswordContainer
                : styles.landscapePasswordContainer
            }
            >
              <View style={
                this.state.viewMode === 'portrait'
                  ? styles.portraitPasswordWrapper
                  : styles.landscapePasswordWrapper
              }
              >
                <DefaultImport placeholder="Password" style={ styles.input }/>
              </View>
              <View style={
                this.state.viewMode === 'portrait'
                  ? styles.portraitPasswordWrapper
                  : styles.landscapePasswordWrapper
              }
              >
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
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  landscapePasswordWrapper: {
    width: '45%',
  },
  portraitPasswordWrapper: {
    width: '100%',
  },
});

export default AuthScreen;
