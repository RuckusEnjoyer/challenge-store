import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { configureStore } from 'redux';
import { Provider } from 'react-redux';

import Nav from './components/Nav';
import rootReducer from './reducers'; // You need to create this file

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

const store = configureStore(rootReducer); // Create a Redux store with your root reducer

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}> {/* Make the Redux store available to your app */}
        <Nav />
        <Outlet />
      </Provider>
    </ApolloProvider>
  );
}

export default App;