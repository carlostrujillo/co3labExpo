import React, {Component} from 'react'
import {
View,
Text,
StyleSheet
    
} from 'react-native'


export default class Profile extends Component {
    constructor(props) {
        super(props);
    }

    _signOtuAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      };

    
    render() {

        return (
        <View  style={styles.container}>
            <Image
            source={{ uri:this.props.Image}}
            style = {style.profileImage}
            />
            <Text>{this.props.UserName}</Text>
            <View>
            <TouchableOpacity onPress={this._signOtuAsync}>
              <Text style={styles.helpLinkText}>Sign out</Text>
            </TouchableOpacity>
          </View>

        </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    profileImage : {
        width : 100,
        height: 100,
        borderRadius: 50
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
      }
});