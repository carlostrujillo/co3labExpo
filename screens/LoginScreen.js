import React, {Component} from 'react';
import { 
    View, 
    Button, 
    StyleSheet,
    Alert,
    ActivityIndicator,
    AsyncStorage,

} from 'react-native';

import {
    icon,
    SocialIcon,
    Header,
    Text
} from 'react-native-elements'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as login from '../actions/loginActions';
import {AuthSession } from 'expo';

const FB_API_ID = "2011718712462198";

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { userInfo : null};
    }

    static navigationOptions = {
        header: null
      };

      async loginFacebook () {
        try {

          debugger;  
          const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
          } = await Expo.Facebook.logInWithReadPermissionsAsync(FB_API_ID, {
            permissions: ['public_profile'],
            behavior: 'native'
          });
          if (type === 'success') {

            
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`);
            const userInfo = await response.json();
            await AsyncStorage.setItem('userToken', token);
            this.setState({userInfo});
            this.props.navigation.navigate('Main', this.state.userInfo)
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }
      
      onSuccess = (data) => {
        console.log(data);
      }

      onError = (error) => {
          console.log(error);
      }


    render() {
        return (
         <View  style={styles.container}>
            <Header
                centerComponent={{ text: 'Sign in', style: { color: '#fff' } }}
            />
            <View style= {styles.logo}>
                <Text h1 style= {styles.logoText}>
                    Co3 Lab
                </Text>
                <Text  style= {styles.logoText}>
                    Replaced by logo and background image
                </Text>
            </View>
            <SocialIcon
            title='Sign In With Facebook'
            button
            onPress={this.loginFacebook()}
            type='facebook'
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    logo : {
        textAlign: 'center',
        paddingTop: 60
    },
    logoText:  {
        textAlign: 'center'
    }
});

/*
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginSuccess: (userToken) => dispatch(login(userToken, onSuccess, onError))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)*/
export default LoginScreen