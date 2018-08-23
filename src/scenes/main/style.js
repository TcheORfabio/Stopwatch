
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  top: {
    flex: 1,
    borderWidth: 5,
  },
  bottom: {
    flex: 3,
    borderWidth: 5,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
  },
  header: {
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
