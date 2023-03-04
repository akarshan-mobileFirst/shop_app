import React, {useEffect} from 'react';
import {
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  View,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  addToCart,
  artworksApi,
  beerApi,
  booksApi,
  makeupApi,
  removeFromCart,
  shopSelector,
} from '../../store/slices/shop_slice';
import styles from './styles';
import {Colors} from '../../utils/colors';
import {Texts} from '../../utils/constants';
import AppBar from '../../components/appbar';
import AppButton from '../../components/button';
import Quantity from '../../components/quantity';
import backImage from '../../components/backImage';
import {FontSize} from '../../utils/fontsize';

function itemInCart(itm, cartData) {
  if (cartData.length > 0 && !!itm?.id) {
    var itemIndex = cartData.findIndex((item, index) => item.id === itm.id);
    if (itemIndex > -1 && !!cartData[itemIndex]?.quantity) {
      return cartData[itemIndex].quantity;
    }
  }
  return 0;
}

function itemTileContent(item, index, cartData, backImg, dispatch) {
  let itemQuantity = itemInCart(item, cartData);

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
        <Text style={styles.itemTileTitle}>{item.title}</Text>
        <Text style={styles.itemTileDescription}>{item.description}</Text>
      </View>
      {itemQuantity > 0 ? (
        <Quantity
          quantity={itemQuantity}
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
      ) : (
        <AppButton
          onPress={() => {
            dispatch(
              addToCart(item, data => {
                if (data?.success === false) {
                  return Alert.alert(Texts.cartUpdateFailed);
                }
              }),
            );
          }}
        />
      )}
    </View>
  );
}

function itemTile(title, data, cartData, dispatch) {
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
            cartData,
            backImage(item.category ?? ''),
            dispatch,
          );
        }}
      />
    </View>
  );
}

function HomeScreen() {
  const dispatch = useDispatch();
  const {loading, artworks, beer, books, cart, makeup} =
    useSelector(shopSelector);

  useEffect(() => {
    dispatch(artworksApi());
    dispatch(beerApi());
    dispatch(booksApi());
    dispatch(makeupApi());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        translucent={false}
        backgroundColor={Colors.white}
      />
      <AppBar />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.blue} />
          <Text style={styles.loaderText}>{Texts.loading}</Text>
        </View>
      ) : artworks.length === 0 &&
        beer.length === 0 &&
        books.length === 0 &&
        makeup.length === 0 ? (
        <View style={styles.emptyProductsWrapper}>
          <MaterialCommunityIcons
            name="delete-empty"
            size={FontSize.massiveBig}
            color={Colors.blue}
          />
          <Text style={styles.emptyProductsText}>{Texts.emptyProducts}</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          bounces={false}
          horizontal={false}>
          {artworks?.length > 0 &&
            itemTile(Texts.artWorks, artworks, cart, dispatch)}
          {beer?.length > 0 && itemTile(Texts.beer, beer, cart, dispatch)}
          {books?.length > 0 && itemTile(Texts.books, books, cart, dispatch)}
          {makeup?.length > 0 && itemTile(Texts.makeup, makeup, cart, dispatch)}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default HomeScreen;
