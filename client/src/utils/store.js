import { configureStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers'; // You need to create this file

// Create a Redux store with your root reducer
const store = createStore(reducer, {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
});

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export { StoreProvider };