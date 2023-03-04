import React from 'react';
import {Text, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Colors} from '../utils/colors';
import {FontSize} from '../utils/fontsize';
import {Texts} from '../utils/constants';

function AppBar() {
  return (
    <View style={styles.appbar}>
      <Fontisto name="shopping-store" size={FontSize.Big} color={Colors.blue} />
      <Text style={styles.appbarText}>{Texts.appBarTitle}</Text>
    </View>
  );
}

export default AppBar;

const styles = {
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    backgroundColor: Colors.white,
    shadowColor: Colors.blue,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  appbarText: {
    color: Colors.blue,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: FontSize.xxl,
    marginLeft: FontSize.xSmall,
  },
};
