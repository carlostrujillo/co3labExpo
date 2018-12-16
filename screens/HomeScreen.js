import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  ActivityIndicator,
  FlatList
} from 'react-native';

import {
  Header,
  ListItem,
  Icon
} from 'react-native-elements';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

const list = [
  {
    title: 'Appointments',
    icon: 'av-timer',
    screen: 'Calendar'
  },
  {
    title: 'Payments',
    icon: 'payment',
    screen: 'Assessment'
  },
  {
    title: 'Assessement',
    icon: 'assessment',
    screen: 'Assessment'

  },

  {
    title: 'Packages',
    icon: 'business-center',
    screen: 'Assessment'
  },
  {
    title: 'Email Marketing',
    icon: 'email',
    screen: 'Assessment'
  }

];

export default class HomeScreen extends React.Component {
constructor(props) {
  super(props);
  this.state = { userInfo : null};
  this.getUserProfile();
}
  static navigationOptions = {
    header: null
  };

   getUserProfile = async() => {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await fetch(`https://graph.facebook.com/me?access_token=${userToken}&fields=id,name,email,picture.type(large)`);
    const userInfo = await response.json();
    this.setState({ userInfo: userInfo});
  }

  handleListPress = (screen) => {
    
    return this.props.navigation.navigate(screen);
  }

  render() {
    if(!this.state.userInfo) {
      return(
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />);
    }
    return (
      
      <View style={styles.container}>
      <Header
      placement="center"
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff' }}
      />
        <View style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.profileContainer}>
          <Image
            source={{ uri:this.state.userInfo.picture.data.url}}
            style = {styles.profileImage}
            />
            <Text>{this.state.userInfo.name}</Text>
          </View>

          <View style={styles.submenu}>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
                onPress={() =>this.handleListPress(item.screen)}
              />
            ))
            }
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._signOtuAsync} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }

  _signOtuAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };


  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  submenu: {
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    backgroundColor: '#ffffff'
    

  },
  contentContainer: {
    paddingTop: 30,
  },
  profileImage : {
    width : 100,
    height: 100,
    borderRadius: 50,
    paddingBottom: 10,
},
 profileContainer: {
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 20,
    paddingBottom: 10,
    backgroundColor: '#ffffff'
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
