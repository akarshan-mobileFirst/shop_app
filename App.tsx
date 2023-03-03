import {LogBox} from 'react-native';
import {RootStack} from './src/navigation';

// To ignore warnings
LogBox.ignoreAllLogs();

function App(): JSX.Element {
  return RootStack();
}

export default App;
