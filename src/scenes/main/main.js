import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import _ from 'lodash';
import * as moment from 'moment';
import { setInitialTime, setFinalTime, addLap, resetLaps, setPause } from '../../redux/actions';
import styles from './style';

const RoundButton = (props) => (
  <TouchableOpacity
    style={[styles.roundButton, { backgroundColor: props.backgroundColor }]}
    onPress={props.onPress}
  >
    <View style={[styles.roundButton, { width: 76, height: 76, borderRadius: 38, borderWidth: 2, borderColor: '#100F10' }]}>
      <Text style={{ color: props.titleColor }}>{props.title}</Text>
    </View>
  </TouchableOpacity>
);

const ListLaps = (props) => (
  <FlatList
    data={props.data}
    keyExtractor={(item, index) => `list_${item}-${index}`}
    renderItem={({ item, index }) => renderItem(item, index)}
  />
);

const renderItem = (lap, index) => {
  const time = moment.duration(lap);
  const milliseconds = _.padStart(time.milliseconds(), 3, '0');
  const seconds = _.padStart(time.seconds(), 2, '0');
  const minutes = _.padStart(time.minutes(), 2, '0');
  const hours = _.padStart(time.hours(), 2, '0');
  return (
    <View style={styles.listItem}>
      <Text style={[styles.fontColorStd, { textAlign: 'center' }]}>
        Lap {_.padStart(index + 1, 2, '0')} - Time: {hours > 0 && `${hours}:`}{minutes}:{seconds},{milliseconds}
      </Text>
    </View>
  );
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.totalTime = 0;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /** Método para iniciar o cronômetro*/
  startTimer = () => {
    clearInterval(this.interval);
    const { finalTime, initialTime, addLap, setFinalTime, setInitialTime, setPause } = this.props; // eslint-disable-line no-shadow
    const lap = finalTime - initialTime;
    if (lap !== 0)
      addLap(lap);

    setPause(true);
    const now = new Date().getTime();
    setInitialTime(now);
    setFinalTime(now);
    this.interval = setInterval(() => setFinalTime(new Date().getTime()), 50);
  }

  pauseTimer = () => {
    const { setInitialTime, setFinalTime, setPause } = this.props; // eslint-disable-line no-shadow
    const now = new Date().getTime();
    clearInterval(this.interval);

    setPause(false);
    this.totalTime += this.props.finalTime - this.props.initialTime;
    setInitialTime(now);
    setFinalTime(now);
  }

  reset = () => {
    this.props.resetLaps();
    clearInterval(this.interval);
    setPause(false);
    setInitialTime(0);
    setFinalTime(0);
    this.totalTime = 0;
  }

  /** Método render*/
  render() {
    const time = moment.duration(this.totalTime + (this.props.finalTime - this.props.initialTime));
    const milliseconds = _.padStart(time.milliseconds(), 3, '0');
    const seconds = _.padStart(time.seconds(), 2, '0');
    const minutes = _.padStart(time.minutes(), 2, '0');
    const hours = _.padStart(time.hours(), 2, '0');
    return (
      <View style={[styles.container, styles.backgroundColorStd]}>
        <View style={styles.ViewTop}>
          <View style={styles.timer}>
            <Text style={[{ fontSize: 45 }, styles.fontColorStd]}>{hours > 0 && `${hours}:`}{minutes}:{seconds},{milliseconds}</Text>
          </View>
        </View>
        {!this.props.isRunning && (
          <View style={styles.ViewMid}>
            <RoundButton title='Iniciar' backgroundColor='#1B301E' titleColor='#50D167' onPress={this.startTimer} />
            <RoundButton title='Parar' backgroundColor='#361515' titleColor='#E33935' onPress={this.reset} />
          </View>
        )}
        {this.props.initialTime > 0 && this.props.isRunning && (
          <View style={styles.ViewMid}>
            <RoundButton title='Volta' backgroundColor='#1B301E' titleColor='#50D167' onPress={this.startTimer} />
            <RoundButton title='Pausar' backgroundColor='#361515' titleColor='#E33935' onPress={this.pauseTimer} />
          </View>
        )}
        <View style={styles.ViewBottom}>
          <View style={{ flex: 1, width: '100%' }}>
            <ListLaps data={this.props.laps} />
          </View>
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
  setPause,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
