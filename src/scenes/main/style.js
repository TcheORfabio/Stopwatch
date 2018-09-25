
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#1B1B1E',
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
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundColorStd: {
    backgroundColor: '#100F10',
  },
  fontColorStd: {
    color: '#FFFFFF',
  },
  textColor: {
    color: '#D8DBE2',
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerRoundButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1B1B1E',
  },
  renderItemView: {
    width: '90%',
    borderTopWidth: 3,
    borderColor: '#D8DBE2',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 10,
    paddingTop: 5,
  },
  fastest: {
    color: '#4BC05F',
  },
  slowest: {
    color: '#CC3531',
  },
});
