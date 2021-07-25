import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
// styles
import { labelStyle } from '../../Styles/styles'
// Container
import AppContainer from '../../Containers/AppContainer';
//component
import CircularBox from '../../Components/CircularBox/CircularBox';
import AppInput from '../../Components/TextInput'
import { signinAction, storePlaceOrderData, storePlaceOrderDataAfterAuth, error } from "../../Store/Action/authAction";
import AsyncStorage from '@react-native-community/async-storage';

const appInput = { width: '80%', paddingTop: '3%' }

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = { _email: '', _password: '', userData: "" }


  }
  componentWillMount() {
    this._retrieveData()

  }
  _retrieveData = async () => {
    console.log("userData")
    // const userData =  AsyncStorage.getItem('userData');
    // console.log(userData, "****userData***")
    // let that = this
    AsyncStorage.getItem('userData').then((data) => {
      let userData = JSON.parse(data)
      console.log(data, 'data found', userData)
      // that.props.storePlaceOrderData(that.props.orderData, that.props.navigation, userData)

    })
      .catch((err) => {
        console.log(err, 'err found')
      })
    // try {
    //   const userData = await AsyncStorage.getItem('userData');
    //   console.log(userData, "****userData***")
    //   this.setState({
    //     userData
    //   },()=>{

    // const afterRout = this.props.navigation.getParam('OrderStatus', {});

    //     if(afterRout === "OrderStatus"){

    //       console.log(this.props.orderData, this.props.navigation, this.state.userData,"*/*",userData)
    //       this.props.storePlaceOrderData(this.props.orderData, this.props.navigation, this.state.userData)
    //     }

    //   })

    // } catch (error) {
    //   console.log(error, "asynkgeterror");
    // }
  };
  // placeOrder(orderData, navigation) {
  //   this._retrieveData()
  //     .then(err => {
  //       this.props.storePlaceOrderDataComponent(orderData, navigation, this.state.userData)
  //     })

  // }
  signinFunc = () => {
    const afterRout = this.props.navigation.getParam('OrderStatus', {});
    console.log(afterRout, "afterRout")
    const { _email, _password } = this.state
    let obj = {
      email: _email,
      password: _password
    }
    if (_email !== "" && _password !== "") {
      let that = this;
      this.props.signinAction(obj)
        .then((userData) => {
          this.setState({ _email: '', _password: '' })
          if (afterRout === "OrderStatus") {
            // setTimeout(() => {
            // this._retrieveData()

            // that.props.storePlaceOrderDataAfterAuth(that.props.orderData, that.props.navigation, userData)
            // }, 500)

            // .then(err => {
            //   console.log(this.props.orderData, this.props.navigation, this.state.userData, "this.props.orderData, this.props.navigation, this.state.userData")
            //   this.props.navigation.navigate("OrderStatus")
            //   })
            // this.placeOrder(this.props.orderData, this.props.navigation)
            // this.props.storePlaceOrderDataComponent(this.props.orderData, this.props.navigation, this.state.userData)

          }
          else if (this.props.orderData && afterRout !== "OrderStatus") {
            this.props.navigation.navigate("Home")
            alert("Your Order placed successfully.")
          } else {
            this.props.navigation.navigate("Home")
          }
          this.props.navigation.navigate("Home")
        })
        .catch((err) => console.log('error', err))
    } else {
      this.props.error("All fields are required.", "err")
      // alert("All fields are required.")
    }
  }
  err(error) {
    return (
      <View>
        <Text style={{ color: error[1] === "err" ? "red" : "yellow" }}>
          {error[0]}
        </Text>
      </View>
    )
  }
  render() {
    const afterRout = this.props.navigation.getParam('OrderStatus', {});

    const { _email, _password } = this.state
    return (
      <AppContainer hideBottomMask={true} footerLink={true} afterRout={afterRout ? afterRout : null} signin={true}  >
        <View style={{ width: '100%', marginTop: '20%' }}>
          <CircularBox
            height={250}
            mainDivHeight={390}
            headSize={25}
            heading="Sign in"
            func={this.signinFunc}
            formBtn={!this.props.loader}
          >
            <View style={appInput}>
              <AppInput
                label="Email"
                value={_email}
                onChange={_email => this.setState({ _email })}
              />
              <View >
                <AppInput
                  secure={true}
                  label="Password"
                  value={_password}
                  onChange={_password => this.setState({ _password })}
                />
                <TouchableOpacity style={{ alignSelf: 'flex-end', paddingTop: '4%' }}>
                  <Text style={labelStyle}>
                    Forgot Password?
              </Text>
                </TouchableOpacity>
              </View>

              {(this.props.errorInStore) ? (
                this.err(this.props.errorInStore)
              ) : (null)}
            </View>
          </CircularBox>
        </View>
      </AppContainer >
    );
  }
}

let mapStateToProps = state => {
  return {
    orderData: state.root.orderData,
    loader: state.root.loader,
    errorInStore: state.root.error,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ signinAction }, dispatch),

    error: (message, errNNotify) => {
      dispatch(error(message, errNNotify))
    },
    bindActionCreatorsclone: (orderData, navigation) => {
      dispatch(storePlaceOrderData(orderData, navigation))
    },
    storePlaceOrderDataAfterAuth: (orderData, navigation, userData) => {
      dispatch(storePlaceOrderDataAfterAuth(orderData, navigation, userData))
    }



  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);