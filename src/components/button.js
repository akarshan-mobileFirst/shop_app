import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Colors} from '../utils/colors';
import {FontSize} from '../utils/fontsize';
import {Texts} from '../utils/constants';

function AppButton(props) {
  const {containerStyle, textStyle, title, onPress} = props;

  return (
    <TouchableOpacity
      style={containerStyle ?? styles.container}
      onPress={onPress != null ? onPress : () => {}}>
      <Text style={textStyle ?? styles.text}>{title ?? Texts.add}</Text>
    </TouchableOpacity>
  );
}

export default AppButton;

const styles = {
  container: {
    backgroundColor: Colors.blue,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  text: {
    color: Colors.white,
    fontSize: FontSize.small,
    fontWeight: 'bold',
  },
};
