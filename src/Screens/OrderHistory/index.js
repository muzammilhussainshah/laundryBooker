import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, FlatList , Platform} from 'react-native';
// styles
// Container
import AppContainer from '../../Containers/AppContainer';
//component
import Greeting from "../../Components/Greeting";
import Gridmenu from "../../Components/Gridmenu";
import { connect } from 'react-redux';
import { storeUserInfo } from '../../Store/Action/authAction'
import RenderList from "../../Components/RenderList";
import Order from '../../../assets/Home/Order.png'
import lifecycle from 'react-pure-lifecycle';
const url = `http://laundary.debughands.com/api/get-order/`

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OrderHistory: [],
    }
  }


  componentWillMount() {
    if (this.props.userInfo.user_detail) {
      console.log(this.props.userInfo.user_detail, "userInfouserInfo")

      fetch(url + this.props.userInfo.user_detail.id, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => {
        return res.json()
      }).then(response => {
        console.log(response, "222response from backend")
        this.setState({ OrderHistory: response.results.data })
      })
    }

  }
  _keyExtractor = (item, index) => JSON.stringify(item.id);

  render() {
    const { OrderHistory } = this.state;

    return (
      <AppContainer hideBottomMask={true} footer={true} header={true} title="Order History"
        // footerText={true}
        footerButton={false} route="Welcome" >

        {
          OrderHistory.length > 0 ?
            <FlatList
              data={OrderHistory ? OrderHistory : []}
              keyExtractor={this._keyExtractor}
              renderItem={({ item, index }) => <RenderList navigation = {this.props.navigation} OrderImg={Order} data={item} key={JSON.stringify(item.id)} />}
            /> :
            <ActivityIndicator size={Platform.android ? 30 : 1} color="#eaa4c7" />
        }

      </AppContainer >
    );
  }
}

let mapStateToProps = state => {
  return {
    userInfo: state.root.userInfo,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    storeUserInfo: () => {
      dispatch(storeUserInfo())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);