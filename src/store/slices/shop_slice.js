import {createSlice} from '@reduxjs/toolkit';
import {generateActionTypes, STATUS, updateStatus} from '../redux/actionTypes';
import {artworks, beer, books, makeup} from '../api';
import {Texts} from '../../utils/constants';

// Initial State
const initialState = {
  loading: false,
  cart: [],
  artworks: [],
  beer: [],
  books: [],
  makeup: [],
};

// Actions
export const GET_ARTWORKS = generateActionTypes('GET_ARTWORKS');
export const GET_BEER = generateActionTypes('GET_BEER');
export const GET_BOOKS = generateActionTypes('GET_BOOKS');
export const GET_MAKEUP = generateActionTypes('GET_MAKEUP');

// Reducer
const shopReducer = builder => {
  builder
    .addCase(GET_ARTWORKS.REQUEST, (state, action) => {
      state.loading = true;
    })
    .addCase(GET_ARTWORKS.DONE, (state, action) => {
      state.loading = false;
      if (action?.payload) {
        state.artworks = action.payload;
      }
    })
    .addCase(GET_ARTWORKS.FAILED, (state, action) => {
      state.loading = false;
    })
    .addCase(GET_BEER.REQUEST, (state, action) => {
      state.loading = true;
    })
    .addCase(GET_BEER.DONE, (state, action) => {
      state.loading = false;
      if (action?.payload) {
        state.beer = action.payload;
      }
    })
    .addCase(GET_BEER.FAILED, (state, action) => {
      state.loading = false;
    })
    .addCase(GET_BOOKS.REQUEST, (state, action) => {
      state.loading = true;
    })
    .addCase(GET_BOOKS.DONE, (state, action) => {
      state.loading = false;
      if (action?.payload) {
        state.books = action.payload;
      }
    })
    .addCase(GET_BOOKS.FAILED, (state, action) => {
      state.loading = false;
    })
    .addCase(GET_MAKEUP.REQUEST, (state, action) => {
      state.loading = true;
    })
    .addCase(GET_MAKEUP.DONE, (state, action) => {
      state.loading = false;
      if (action?.payload) {
        state.makeup = action.payload;
      }
    })
    .addCase(GET_MAKEUP.FAILED, (state, action) => {
      state.loading = false;
    });
};

// A Slice
const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: shopReducer,
});

// A selector
export const shopSelector = state => state.shop;

// The reducer
export default shopSlice.reducer;

// Asynchronous thunk action
export function artworksApi() {
  return async dispatch => {
    try {
      dispatch(updateStatus({[GET_ARTWORKS.STATUS]: STATUS.REQUEST}));
      dispatch(GET_ARTWORKS.REQUEST());
      await artworks()
        .then(response => {
          if (
            response.status === 200 &&
            response?.data?.data !== null &&
            response.data.data.length > 0
          ) {
            let artWorksData = [];
            response.data.data
              .slice(
                0,
                response.data.data.length > 10 ? 10 : response.data.data.length,
              )
              .forEach(element => {
                artWorksData.push({
                  id: element?.id ?? 0,
                  title: element?.title ?? '',
                  image: element?.image_id
                    ? `https://www.artic.edu/iiif/2/${element.image_id}/full/843,/0/default.jpg`
                    : '',
                  description:
                    element?.thumbnail?.alt_text ?? element?.credit_line ?? '',
                  category: Texts.artWorks,
                });
              });
            dispatch(updateStatus({[GET_ARTWORKS.STATUS]: STATUS.DONE}));
            dispatch(GET_ARTWORKS.DONE(artWorksData));
          } else {
            console.log('error: ', response.status);
            dispatch(updateStatus({[GET_ARTWORKS.STATUS]: STATUS.FAILED}));
            dispatch(GET_ARTWORKS.FAILED());
          }
        })
        .catch(error => {
          console.log('error: ', error);
          dispatch(updateStatus({[GET_ARTWORKS.STATUS]: STATUS.FAILED}));
          dispatch(GET_ARTWORKS.FAILED());
        });
    } catch (error) {
      console.log('error: ', error);
      dispatch(updateStatus({[GET_ARTWORKS.STATUS]: STATUS.FAILED}));
      dispatch(GET_ARTWORKS.FAILED());
    }
  };
}

export function beerApi() {
  return async dispatch => {
    try {
      dispatch(updateStatus({[GET_BEER.STATUS]: STATUS.REQUEST}));
      dispatch(GET_BEER.REQUEST());
      await beer()
        .then(response => {
          if (
            response.status === 200 &&
            response?.data !== null &&
            response.data.length > 0
          ) {
            let beerData = [];
            response.data
              .slice(0, response.data.length > 10 ? 10 : response.data.length)
              .forEach(element => {
                beerData.push({
                  id: element?.id ?? 0,
                  title: element?.name ?? '',
                  image: element?.image_url ?? '',
                  description: element?.description ?? '',
                  category: Texts.beer,
                });
              });
            dispatch(updateStatus({[GET_BEER.STATUS]: STATUS.DONE}));
            dispatch(GET_BEER.DONE(beerData));
          } else {
            console.log('error: ', response.status);
            dispatch(updateStatus({[GET_BEER.STATUS]: STATUS.FAILED}));
            dispatch(GET_BEER.FAILED());
          }
        })
        .catch(error => {
          console.log('error: ', error);
          dispatch(updateStatus({[GET_BEER.STATUS]: STATUS.FAILED}));
          dispatch(GET_BEER.FAILED());
        });
    } catch (error) {
      console.log('error: ', error);
      dispatch(updateStatus({[GET_BEER.STATUS]: STATUS.FAILED}));
      dispatch(GET_BEER.FAILED());
    }
  };
}

export function booksApi() {
  return async dispatch => {
    try {
      dispatch(updateStatus({[GET_BOOKS.STATUS]: STATUS.REQUEST}));
      dispatch(GET_BOOKS.REQUEST());
      await books()
        .then(response => {
          if (
            response.status === 200 &&
            response?.data?.results !== null &&
            response.data.results.length > 0
          ) {
            let booksData = [];
            response.data.results
              .slice(
                0,
                response.data.results.length > 10
                  ? 10
                  : response.data.results.length,
              )
              .forEach(element => {
                booksData.push({
                  id: element?.id ?? 0,
                  title: element?.title ?? '',
                  image: element?.formats?.['image/jpeg'] ?? '',
                  description:
                    element?.subjects.length > 0
                      ? element.subjects[0] ?? ''
                      : '',
                  category: Texts.books,
                });
              });
            dispatch(updateStatus({[GET_BOOKS.STATUS]: STATUS.DONE}));
            dispatch(GET_BOOKS.DONE(booksData));
          } else {
            console.log('error: ', response.status);
            dispatch(updateStatus({[GET_BOOKS.STATUS]: STATUS.FAILED}));
            dispatch(GET_BOOKS.FAILED());
          }
        })
        .catch(error => {
          console.log('error: ', error);
          dispatch(updateStatus({[GET_BOOKS.STATUS]: STATUS.FAILED}));
          dispatch(GET_BOOKS.FAILED());
        });
    } catch (error) {
      console.log('error: ', error);
      dispatch(updateStatus({[GET_BOOKS.STATUS]: STATUS.FAILED}));
      dispatch(GET_BOOKS.FAILED());
    }
  };
}

export function makeupApi() {
  return async dispatch => {
    try {
      dispatch(updateStatus({[GET_MAKEUP.STATUS]: STATUS.REQUEST}));
      dispatch(GET_MAKEUP.REQUEST());
      await makeup()
        .then(response => {
          if (
            response.status === 200 &&
            response?.data !== null &&
            response.data.length > 0
          ) {
            let makeupData = [];
            response.data
              .slice(0, response.data.length > 10 ? 10 : response.data.length)
              .forEach(element => {
                makeupData.push({
                  id: element?.id ?? 0,
                  title: element?.name ?? '',
                  image: element?.image_link ?? '',
                  description: element?.description ?? '',
                  category: Texts.makeup,
                });
              });
            dispatch(updateStatus({[GET_MAKEUP.STATUS]: STATUS.DONE}));
            dispatch(GET_MAKEUP.DONE(makeupData));
          } else {
            console.log('error: ', response.status);
            dispatch(updateStatus({[GET_MAKEUP.STATUS]: STATUS.FAILED}));
            dispatch(GET_MAKEUP.FAILED());
          }
        })
        .catch(error => {
          console.log('error: ', error);
          dispatch(updateStatus({[GET_MAKEUP.STATUS]: STATUS.FAILED}));
          dispatch(GET_MAKEUP.FAILED());
        });
    } catch (error) {
      console.log('error: ', error);
      dispatch(updateStatus({[GET_MAKEUP.STATUS]: STATUS.FAILED}));
      dispatch(GET_MAKEUP.FAILED());
    }
  };
}
