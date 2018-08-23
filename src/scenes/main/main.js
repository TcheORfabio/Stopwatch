import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import { addTime, togglePause } from '../../redux/actions';
import { styles } from './style';
import Chronometer from './Chronometer';

const Main = props => {
  const { container, header, title, top, bottom } = styles;
  /* Styles do Timer */
  const { timerWrapper } = styles;
  /* Styles do Button */
  const { buttonWrapper } = styles;
  /** Objeto responsável por contar o tempo
  const chrono = new Chronometer();
  let currentLap = 0;
  let totalTime = 0;
*/
  const _renderTitle = () => (
    <View style={header}>
      <Text style={title}>Chronus</Text>
    </View>
  );

  const _renderTimer = () => (
    <View style={timerWrapper}>
      <Text>{props.time === undefined ? '00' : props.time}</Text>
    </View>
  );

  const _renderButtons = () => (
    <View style={buttonWrapper}>
      <Button
        title='Iniciar'
        onPress={() => {
          console.log(props);
          props.addTime(1);
        }}
      />
      <Button
        title='Volta'
        onPress={() => true}
      />
    </View>
  );

  return (
    <View style={container}>
      <View style={top}>
        {_renderTitle()}
        {_renderTimer()}
      </View>
      <View style={bottom}>
        {_renderButtons()}
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const mapStateToProps = state => ({
  time: state.mainReducer.time,
  pause: state.mainReducer.pause,
});

// const mapActionsToProps = dispatch => ({
//   add: (time) => dispatch(addTime(time)),
//   toggle: () => dispatch(togglePause()),
// });

const mapDispatchToProps = {
  addTime,
  togglePause,
};
