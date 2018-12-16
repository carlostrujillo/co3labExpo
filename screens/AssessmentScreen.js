import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Header } from "react-native-elements";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie, VictoryAnimation, VictoryLabel } from "victory-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

export default class AssessmentScreen extends React.Component {

    constructor() {
        super();
        this.state = {
        percent: 25, data: this.getData(0)
        };
    }
    static navigationOptions = {
        header: null
      };
    
    getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
    }

    componentDidMount() {
        let percent = 25;
        this.setStateInterval = window.setInterval(() => {
          percent += (Math.random() * 25);
          percent = (percent > 100) ? 0 : percent;
          this.setState({
            percent, data: this.getData(percent)
          });
        }, 2000);
      }
    
      componentWillUnmount() {
        window.clearInterval(this.setStateInterval);
      }
  render() {
    return (
      <View>

       <Header
      placement="center"
      
      centerComponent={{ text: 'Assessment', style: { color: '#fff' } }}
    
      />
      <View style={styles.container}>
    
       <ScrollView>

        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
        <VictoryChart width={350}>
        <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={400} height={400}
            data={this.state.data}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: { fill: (d) => {
                const color = d.y > 30 ? "green" : "red";
                return d.x === 1 ? color : "transparent";
              }
              }
            }}
          />
          <VictoryAnimation duration={1000} data={this.state}>
            {(newProps) => {
              return (
                <VictoryLabel
                  textAnchor="middle" verticalAnchor="middle"
                  x={200} y={200}
                  text={`${Math.round(newProps.percent)}%`}
                  style={{ fontSize: 45 }}
                />
              );
            }}
          </VictoryAnimation>
          </VictoryChart>
          </ScrollView>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});