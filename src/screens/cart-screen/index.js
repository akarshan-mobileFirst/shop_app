import React from 'react';
import {
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  View,
  Alert,
  ImageBackground,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  removeFromCart,
  shopSelector,
} from '../../store/slices/shop_slice';
import styles from './styles';
import {Colors} from '../../utils/colors';
import {Texts} from '../../utils/constants';
import AppBar from '../../components/appbar';
import Quantity from '../../components/quantity';
import backImage from '../../components/backImage';
import { FontSize } from '../../utils/fontsize';

function itemTileContent(item, index, backImg, dispatch) {
  return (
    <View style={styles.itemTileContainer}>
      <ImageBackground
        source={{
          uri: backImg,
        }}
        resizeMode="contain"
        style={styles.itemTileImage}>
        <Image
          source={{uri: item.image}}
          resizeMode="contain"
          style={styles.itemTileImage}
        />
      </ImageBackground>
      <View style={styles.itemTileTextWrapper}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.itemTileTitle}>
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.itemTileDescription}>
          {item.description}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.itemTileCategory}>
          {`Category: ${item.category}`}
        </Text>
      </View>
      <Quantity
        quantity={item.quantity}
        onPlusPress={() => {
          dispatch(
            addToCart(item, data => {
              if (data?.success === false) {
                return Alert.alert(Texts.cartUpdateFailed);
              }
            }),
          );
        }}
        onMinusPress={() => {
          dispatch(
            removeFromCart(item, data => {
              if (data?.success === false) {
                return Alert.alert(Texts.cartUpdateFailed);
              }
            }),
          );
        }}
      />
    </View>
  );
}

function itemTile(title, data, dispatch) {
  const marginTop = title === Texts.artWorks ? 0 : 10;
  return (
    <View>
      <Text style={[styles.categoryText, {marginTop: marginTop}]}>{title}</Text>
      <FlatList
        bounces={false}
        scrollEnabled={false}
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={({item, index}) => {
          return itemTileContent(
            item,
            index,
            backImage(item.category ?? ''),
            dispatch,
          );
        }}
      />
    </View>
  );
}

function CartScreen() {
  const dispatch = useDispatch();
  const {cart} = useSelector(shopSelector);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        translucent={false}
        backgroundColor={Colors.white}
      />
      <AppBar />
      {cart?.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          bounces={false}
          horizontal={false}>
          {itemTile(Texts.cart, cart, dispatch)}
        </ScrollView>
      ) : (
        <View style={styles.emptyCartWrapper}>
          <MaterialCommunityIcons
            name="cart"
            size={FontSize.massiveBig}
            color={Colors.blue}
          />
          <Text style={styles.emptyCartText}>{Texts.emptyCart}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default CartScreen;
