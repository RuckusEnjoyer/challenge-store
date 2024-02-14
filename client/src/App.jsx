import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import Nav from './components/Nav';
// import reducer from './utils/reducers';
import store from './utils/store'
import StoreProvider from './utils/store.jsx'; // Adjust the path as needed

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <StoreProvider> {/* Make the Redux store available to your app */}
        <Nav />
        <Outlet />
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;