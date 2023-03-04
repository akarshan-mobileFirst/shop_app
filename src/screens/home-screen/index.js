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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  artworksApi,
  beerApi,
  booksApi,
  makeupApi,
  shopSelector,
} from '../../store/slices/shop_slice';
import styles from './styles';
import {Colors} from '../../utils/colors';
import {Texts} from '../../utils/constants';
import AppBar from '../../components/appbar';
import AppButton from '../../components/button';
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
      <AppButton />
      {/* <Quantity /> */}
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

function HomeScreen() {
  const dispatch = useDispatch();
  const {loading, artworks, beer, books, makeup} = useSelector(shopSelector);

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
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          bounces={false}
          horizontal={false}>
          {artworks?.length > 0 &&
            itemTile(
              Texts.artWorks,
              artworks,
              'https://www.clipartmax.com/png/middle/109-1097604_computer-icons-painting-artist-painter-drawing-painter-icon.png',
            )}
          {beer?.length > 0 &&
            itemTile(
              Texts.beer,
              beer,
              'https://png.pngtree.com/png-vector/20191004/ourlarge/pngtree-beer-icon-png-image_1791305.jpg',
            )}
          {books?.length > 0 &&
            itemTile(
              Texts.books,
              books,
              'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg',
            )}
          {makeup?.length > 0 &&
            itemTile(
              Texts.makeup,
              makeup,
              'https://cdn.britannica.com/35/222035-050-C68AD682/makeup-cosmetics.jpg',
            )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default HomeScreen;
