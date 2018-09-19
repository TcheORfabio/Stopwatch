
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  ViewTop: {
    flex: 1,
    justifyContent: 'center',
  },
  ViewMid: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5,
  },
  ViewBottom: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    flex: 0.75,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderRadius: 5,
    borderColor: '#000',
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    width: '90%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 5,
    backgroundColor: '#17BEBB',
  },
});
