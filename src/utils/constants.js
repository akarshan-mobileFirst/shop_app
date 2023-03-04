import {Dimensions} from 'react-native';

// Device Dimensions
const {height, width} = Dimensions.get('window');
export {height as deviceHeight, width as deviceWidth};

// API URLs
export const API_URL = {
  ARTWORKS_API: 'https://api.artic.edu/api/v1/artworks?page=1',
  BEER_API: 'https://api.punkapi.com/v2/beers',
  BOOKS_API: 'https://gutendex.com/books?page=1',
  MAKEUP_API: 'http://makeup-api.herokuapp.com/api/v1/products.json',
};

// Messages
export const Message = {
  // OTP_SENT:
  //   "We've sent a verification code to your mobile number. Please check the same.",
};

// Texts
export const Texts = {
  appBarTitle: 'Online Shop',
  artWorks: 'Artworks',
  beer: 'Beer',
  books: 'Books',
  makeup: 'Makeup',
  add: 'Add',
  loading: 'Loading...',
  cart: 'Cart',
  emptyCart: 'Cart is empty',
};
