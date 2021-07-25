import React, { Component } from 'react';
// Container
import AppContainer from '../../Containers/AppContainer';
//component
import PaymentContainer from "../../Containers/PaymentContainer";
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { storePlaceOrderData,error } from '../../Store/Action/authAction'

class PaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    console.log("props,bablu")


    const data = this.props.navigation.getParam('data', 'NO-ID');

    console.log(data, "****data****")

    this.setState({
      data:data
    })
    this._retrieveData()

  }
  payment(paymentObj) {
    console.log(paymentObj,"paymentObj")
    let dataClone = this.state.data
    dataClone.paymentObj = paymentObj
    this.setState({
      paymentObj:paymentObj, data: dataClone
    })
    console.log(paymentObj, "paymentObjj", dataClone)
  }

  _retrieveData = async () => {
    console.log("userData")
    try {
      const userData = await AsyncStorage.getItem('userData');
      console.log(userData, "****userData***")
      this.setState({
        userData
      })

    } catch (error) {
      console.log(error, "asynkgeterror");
    }
  };
  dataStore() {
    console.log(this.state.data, this.props.navigation, "this.state.userData",this.props.userInfo,this.state.userData)
    if (this.state.paymentObj && this.state.paymentObj._cardNumber === "4111111111111111") {
      this.props.storePlaceOrderDataComponent(this.state.data, this.props.navigation, this.props.userInfo)
      
    }
    else { 
      this.props.error("invalid card", "err")

      // alert("invalid card")
     }
    console.log(this.state.data)
  }

  render() {
    return (
      <AppContainer
      // footerButtonBack={true}
        hideBottomMask={true}
        footer={true}
        header={true}
        title="Checkout"
        footerButton={true}
        // footerText={false}
        // footerText={true}
        data={this.state.data}
        // route="OrderStatus"
        func={() => this.dataStore()}
        // route={this.state.paymentObj && this.state.paymentObj._cardNumber === "4111111111111111"
        //   ? "OrderStatus" :
        //   null}
      >
        <PaymentContainer func={(paymentObj) => this.payment(paymentObj)} />
      </AppContainer>
    )
  }
}










// const PaymentDetails = () => {
//   return (
//     <AppContainer
//       hideBottomMask={true}
//       footer={true}
//       header={true}
//       title="Checkout"
//       footerButton={true}
//       footerText={false}
//       route="OrderStatus"
//     >
//       <PaymentContainer />
//     </AppContainer>
//   );
// }



let mapStateToProps = state => {
  return {
    loader: state.root.loader,
    errorInStore: state.root.error,
    userInfo: state.root.userInfo,
    shop_id: state.root.shop_id,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    storePlaceOrderDataComponent: (data, navigation, userInfo) => {
      dispatch(storePlaceOrderData(data, navigation, userInfo))
    },
    error: (message,errNNotify) => {
      dispatch(error(message,errNNotify))
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);