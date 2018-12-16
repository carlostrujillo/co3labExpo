import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Header } from "react-native-elements";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class CalendarScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onDayPress = this.onDayPress.bind(this);
      }
    static navigationOptions = {
        header: null
    };

    onDayPress(day) {
        this.setState({
          selected: day.dateString
        });
      }
    render() {
        return(

            <View>
                <Header
                centerComponent={{ text: 'Appointments', style: { color: '#fff' } }}
                />
            <Calendar
                onDayPress={this.onDayPress}
                style={styles.calendar}
                hideExtraDays
                markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
            />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    calendar: {
      borderTopWidth: 1,
      paddingTop: 5,
      borderBottomWidth: 1,
      borderColor: '#eee',
      height: 350
    },
    text: {
      textAlign: 'center',
      borderColor: '#bbb',
      padding: 10,
      backgroundColor: '#eee'
    },
    container: {
      flex: 1,
      backgroundColor: 'gray'
    }
  });