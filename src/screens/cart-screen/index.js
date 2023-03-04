import React, {useEffect} from 'react';
import {
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {shopSelector} from '../../store/slices/shop_slice';
import styles from './styles';
import {Colors} from '../../utils/colors';
import {Texts} from '../../utils/constants';
import AppBar from '../../components/appbar';
import Quantity from '../../components/quantity';

function itemTileContent(item, index, backImage) {
  return (
    <View style={styles.itemTileContainer}>
      <ImageBackground
        source={{
          uri: backImage,
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
        <Text style={styles.itemTileTitle}>{item.title}</Text>
        <Text style={styles.itemTileDescription}>{item.description}</Text>
      </View>
      <Quantity />
    </View>
  );
}

function itemTile(title, data, backImage) {
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
          return itemTileContent(item, index, backImage);
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
          {itemTile(Texts.cart, cart, '')}
        </ScrollView>
      ) : (
        <View style={styles.emptyCartWrapper}>
          <Text style={styles.emptyCartText}>{Texts.emptyCart}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default CartScreen;
