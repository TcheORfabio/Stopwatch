import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import _ from 'lodash';
import * as moment from 'moment';
import { setInitialTime, setFinalTime, setLap, addLap, resetLaps, setPause } from '../../redux/actions';
import styles from './style';

const RoundButton = (props) => (
  <TouchableOpacity
    style={[styles.roundButton, { backgroundColor: props.backgroundColor }, props.disabled && { opacity: 0.5 }]}
    onPress={() => !props.disabled && props.onPress()}
    activeOpacity={props.disabled ? 0.5 : 0.7}
  >
    <View style={styles.innerRoundButton}>
      <Text style={styles.textColor}>{props.title}</Text>
    </View>
  </TouchableOpacity>
);

const renderItemSeparator = () => (
  <View
    style={{
      height: 1,
      width: '85%',
      backgroundColor: '#CED0CE',
      alignSelf: 'center',
    }}
  />
);

const ListLaps = (props) => {
  const finishedLaps = props.data.slice(1);
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  if (finishedLaps.length >= 2) {
    finishedLaps.forEach(lap => {
      if (lap.lap < min) min = lap.lap;
      if (lap.lap > max) max = lap.lap;
    });
  }

  return (
    <FlatList
      data={props.data}
      keyExtractor={(item, index) => `list_${item}-${index}`}
      ItemSeparatorComponent={renderItemSeparator}
      renderItem={({ item }) => {
        const fastest = (item.lap === min);
        const slowest = (item.lap === max);
        return renderItem(item, fastest, slowest);
      }}
      style={{ width: '100%' }}
    />
  );
};

const renderItem = (item, fastest, slowest) => {
  const time = moment.duration(item.lap);
  const milliseconds = _.padStart(time.milliseconds(), 3, '0');
  const seconds = _.padStart(time.seconds(), 2, '0');
  const minutes = _.padStart(time.minutes(), 2, '0');
  const hours = _.padStart(time.hours(), 2, '0');
  const itemStyle = [
    styles.textColor,
    { flex: 1, textAlign: 'center' },
    fastest && styles.fastest,
    slowest && styles.slowest,
  ];
  return (
    <View style={styles.renderItemView}>
      <Text style={itemStyle}>
        Lap {_.padStart(item.index + 1, 2, '0')} - Time: {hours > 0 && `${hours}:`}{minutes}:{seconds},{milliseconds}
      </Text>
    </View>
  );
};

class Main extends Component {
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /** Método para iniciar o cronômetro*/
  startTimer = () => {
    this.props.setPause(true);
    clearInterval(this.interval);
    const now = new Date().getTime();
    this.props.setInitialTime(now);
    this.props.setFinalTime(now);

    this.interval = setInterval(() => {
      this.props.setFinalTime(new Date().getTime());
      this.props.setLap(this.props.finalTime - this.props.initialTime, this.props.laps.length - 1);
    }, 50);
  }

  addLap = () => {
    const time = this.props.finalTime - this.props.initialTime;
    const index = this.props.laps.length;
    this.props.addLap(time, index);
    const now = new Date().getTime();
    this.props.setInitialTime(now);
    this.props.setFinalTime(now);
  }

  pauseTimer = () => {
    clearInterval(this.interval);
    this.props.setPause(false);
    const now = new Date().getTime();
    this.props.setFinalTime(now);
  }

  stopTimer = () => {
    clearInterval(this.interval);
    const time = this.props.finalTime - this.props.initialTime;
    const index = this.props.laps.length;
    this.props.setLap(time, index);
    this.props.setInitialTime(0);
    this.props.setFinalTime(0);
  }

  resetTimer = () => {
    const { setPause, setInitialTime, setFinalTime, resetLaps } = this.props; /* eslint-disable-line no-shadow */
    setPause(false);
    setInitialTime(0);
    setFinalTime(0);
    resetLaps();
  }

  resumeTimer = () => {
    const { setPause, setInitialTime, setFinalTime } = this.props; /* eslint-disable-line no-shadow */
    setPause(true);
    const now = new Date().getTime();
    setInitialTime(now);
    setFinalTime(now);

    this.interval = setInterval(() => {
      this.props.setFinalTime(new Date().getTime());
      this.props.setLap(this.props.finalTime - this.props.initialTime, this.props.laps.length - 1);
    }, 50);
  }

  /** Método render*/
  render() {
    const time = moment.duration(this.props.laps.reduce((acc, next) => acc + next.lap, 0) + (this.props.finalTime - this.props.initialTime));
    const milliseconds = _.padStart(time.milliseconds(), 3, '0');
    const seconds = _.padStart(time.seconds(), 2, '0');
    const minutes = _.padStart(time.minutes(), 2, '0');
    const hours = _.padStart(time.hours(), 2, '0');
    return (
      <View style={styles.container}>
        <View style={styles.ViewTop}>
          <Text style={[
            { flex: 0.5,
              width: '100%',
              fontSize: 45,
              textAlign: 'center',
            },
            styles.textColor,
          ]}
          >
            <Text style={{ width: '22%' }}>{hours > 0 && `${hours}:`}</Text>
            <Text style={{ width: '22%' }}>{minutes}:</Text>
            <Text style={{ width: '22%' }}>{seconds}, </Text>
            <Text style={{ width: '34%' }}>{milliseconds}</Text>
          </Text>
        </View>
        {this.props.laps.length === 0 && !this.props.isRunning && (
          <View style={styles.ViewMid}>
            <RoundButton title='Iniciar' backgroundColor='#3E8989' onPress={this.startTimer} />
            <RoundButton title='Parar' backgroundColor='#D62246' disabled />
          </View>
        )}
        {this.props.finalTime > 0 && this.props.isRunning && (
          <View style={styles.ViewMid}>
            <RoundButton title='Volta' backgroundColor='#3E8989' onPress={this.addLap} />
            <RoundButton title='Pausar' backgroundColor='#D62246' onPress={this.stopTimer} />
          </View>
        )}
        {this.props.laps.length > 0 && this.props.initialTime === 0 && (
          <View style={styles.ViewMid}>
            <RoundButton title='Reiniciar' backgroundColor='#3E8989' onPress={this.resumeTimer} />
            <RoundButton title='Parar' backgroundColor='#D62246' onPress={this.resetTimer} />
          </View>
        )}
        <View style={styles.ViewBottom}>
          <ListLaps data={this.props.laps} />
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
  setLap,
  resetLaps,
  setPause,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
