import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export class RNFirebaseMessagingService {
  static requestUserPermission = async () => {
    console.log('FIREBASE:: requestUserPermission');

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      this.setBackgroundMessageHandler();
      this.subscribeMessaging();
      this.getFcmToken();
      console.log('FIREBASE:: Authorization status:', authStatus);
    }
  };

  static setBackgroundMessageHandler = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(
        'FIREBASE:: Message handled in the background!',
        remoteMessage,
      );
    });
  };

  static getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      console.log('FIREBASE:: Your Firebase Token is:', fcmToken);
      AsyncStorage.setItem('firebase_token', JSON.stringify(fcmToken));
      console.log('FCM TOKEN SET TO ASYNC STOREAGE', fcmToken);
    } else {
      console.log('FIREBASE:: Failed', 'No token received');
    }
  };

  static subscribeMessaging = async () => {
    console.log('FIREBASE:: subscribeMessaging :: onMessage');

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('messaging().onNotificationOpenedApp', remoteMessage);
      Alert.alert(
        `${remoteMessage.notification.title ?? 'Notification Pressed'}`,
        `${remoteMessage.notification.body ?? ''}`,
      );
    });

    messaging().getInitialNotification(remoteMessage => {
      console.log('messaging().getInitialNotification', remoteMessage);
    });

    const subscribe = messaging().onMessage(async remoteMessage => {
      console.log('FIREBASE:: A new FCM message arrived!', remoteMessage);
      Alert.alert(
        `${remoteMessage.notification.title ?? 'Notification Arrived'}`,
        `${remoteMessage.notification.body ?? ''}`,
      );
    });

    return subscribe;
  };
}
