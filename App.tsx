import {useEffect} from 'react';
import {LogBox} from 'react-native';
import {RootStack} from './src/navigation';
import {RNFirebaseMessagingService} from './src/utils/firebase_messaging_service';

// To ignore warnings
LogBox.ignoreAllLogs();

function App(): JSX.Element {
  useEffect(() => {
    RNFirebaseMessagingService.requestUserPermission();
  }, []);

  return RootStack();
}

export default App;
