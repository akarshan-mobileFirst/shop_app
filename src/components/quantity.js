import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../utils/colors';
import {FontSize} from '../utils/fontsize';

function Quantity(props) {
  const {
    containerStyle,
    buttonWrapper,
    textStyle,
    quantityTextStyle,
    quantity,
    onPlusPress,
    onMinusPress,
  } = props;

  return (
    <View style={containerStyle ?? styles.container}>
      <TouchableOpacity
        style={buttonWrapper ?? styles.textWrapper}
        onPress={onPlusPress != null ? onPlusPress : () => {}}>
        <Text style={textStyle ?? styles.text}>+</Text>
      </TouchableOpacity>
      <Text style={quantityTextStyle ?? styles.quantityText}>
        {quantity ?? 0}
      </Text>
      <TouchableOpacity
        style={buttonWrapper ?? styles.textWrapper}
        onPress={onPlusPress != null ? onMinusPress : () => {}}>
        <Text style={textStyle ?? styles.text}>-</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Quantity;

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrapper: {
    backgroundColor: Colors.blue,
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  text: {
    color: Colors.white,
    fontSize: FontSize.small,
    fontWeight: 'bold',
  },
  quantityText: {
    color: Colors.black,
    fontSize: FontSize.base,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
};
