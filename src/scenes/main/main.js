import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import _ from 'lodash';
import * as moment from 'moment';
import { setInitialTime, setFinalTime, addLap, resetLaps } from '../../redux/actions';
import styles from './style';

const RoundButton = (props) => (
  <TouchableOpacity
    style={[styles.roundButton, props.style]}
    onPress={props.onPress}
  >
    <Text style={styles.titleButton}>{props.title}</Text>
  </TouchableOpacity>
);

class Main extends Component {
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /** Método para iniciar o cronômetro*/
  startTimer = () => {
    this.stopTimer();
    const { finalTime, initialTime, addLap, setFinalTime, setInitialTime } = this.props; // eslint-disable-line no-shadow
    const lap = finalTime - initialTime;
    if (lap !== 0)
      addLap(lap);

    const now = new Date().getTime();
    setInitialTime(now);
    setFinalTime(now);
    this.interval = setInterval(() => setFinalTime(new Date().getTime()), 50);
  }

  stopTimer = () => {
    clearInterval(this.interval);
    const { setInitialTime, setFinalTime } = this.props; // eslint-disable-line no-shadow
    setInitialTime(0);
    setFinalTime(0);
  }

  ListLaps = () => (
    <FlatList
      data={this.props.laps}
      keyExtractor={(item, index) => `list_${item}-${index}`}
      renderItem={({ item, index }) => this.renderItem(item, index)}
    />
  )

  renderItem = (lap, index) => {
    const time = moment.duration(lap);
    const milliseconds = _.padStart(time.milliseconds(time.milliseconds()), 3, '0');
    const seconds = _.padStart(time.seconds(time.milliseconds()), 2, '0');
    const minutes = _.padStart(time.minutes(time.milliseconds()), 2, '0');
    return (
      <View style={{ width: '90%', borderWidth: 3, borderRadius: 3, alignSelf: 'center' }}>
        <Text>Lap {_.padStart(index, 2, '0')} Time: {minutes}:{seconds}, {milliseconds}</Text>
      </View>
    );
  }

  /** Método render*/
  render() {
    const time = moment.duration(this.props.finalTime - this.props.initialTime);
    const milliseconds = _.padStart(time.milliseconds(time.milliseconds()), 3, '0');
    const seconds = _.padStart(time.seconds(time.milliseconds()), 2, '0');
    const minutes = _.padStart(time.minutes(time.milliseconds()), 2, '0');
    return (
      <View style={styles.container}>
        <View style={styles.ViewTop}>
          <View style={styles.timer}>
            <Text style={{ fontSize: 45 }}>{minutes}:{seconds}, {milliseconds}</Text>
          </View>
        </View>
        <View style={styles.ViewMid}>
          <RoundButton title='Iniciar' onPress={this.startTimer} />
          <RoundButton title='Parar' onPress={this.stopTimer} />
        </View>
        <View style={styles.ViewBottom}>
          <View style={{ flex: 1, width: '100%', borderWidth: 3 }}>
            <this.ListLaps />
          </View>
          <TouchableOpacity onPress={this.props.resetLaps} style={styles.resetButton}>
            <Text>Reset Laps</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  initialTime: state.mainReducer.initialTime,
  finalTime: state.mainReducer.finalTime,
  laps: state.mainReducer.laps,
  isRunning: state.mainReducer.isRunning,
});

const mapDispatchToProps = {
  setInitialTime,
  setFinalTime,
  addLap,
  resetLaps,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
