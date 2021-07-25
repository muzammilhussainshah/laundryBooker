import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './Store';
import Routes from './Routes';
import { StatusBar } from 'react-native'
class App extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    console.disableYellowBox = true
  }
  render() {
    return (
      <Provider store={store}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Routes />
      </Provider>
    );
  }
}

export default App;