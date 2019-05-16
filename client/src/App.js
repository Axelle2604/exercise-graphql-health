import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppContainer from './components/AppContainer';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from './services/apolloClient';

function App() {
  return (
    <div className="App">
      <ApolloProvider client={ApolloClient}>
        <AppContainer />
      </ApolloProvider>
    </div>
  );
}

export default App;
