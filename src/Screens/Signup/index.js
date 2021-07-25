import React, { Component } from 'react';
import { View ,Text} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import AppContainer from '../../Containers/AppContainer';
import CircularBox from '../../Components/CircularBox/CircularBox';
import AppInput from '../../Components/TextInput'
import { signupAction, storePlaceOrderDataAfterAuth,error } from "../../Store/Action/authAction";

const appInput = { width: '80%', paddingTop: '3%' }

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { _email: '', _number: '', _password: '', _confirmPassword: '' }
  }

  signupFunc = () => {
    const { _email, _password, _number, _confirmPassword } = this.state
    let obj = {
      email: _email,
      password: _password,
      mobile_number: _number
    }
    if (_email !== "" && _number !== "" && _password !== "" && _confirmPassword !== "") {
      if (_password === _confirmPassword) {
        let that = this;

        this.props.signupAction(obj)


          .then((userData) => {
            const afterRout = this.props.navigation.getParam('OrderStatus', {});
            console.log(afterRout, "afterRoutafterRoutafterRoutafterRout")
            if (afterRout &&that.props.orderData) {

              // that.props.storePlaceOrderDataAfterAuth(that.props.orderData, that.props.navigation, userData)

            }

            if (this.props.orderData) {
              this.props.navigation.navigate("Home")
              alert("Your Order placed successfully.")
            } else {
              this.props.navigation.navigate("Home")
            }
          })
          .catch((err) => console.log('error',err))
      } else {
        alert("Password Mismatch.")
      }
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
    const { _email, _password, _number, _confirmPassword } = this.state
    return (
      <AppContainer hideBottomMask={true} footerLink={true} signup={true} >
        <View style={{ width: '100%', marginTop: '6%' }}>
          <CircularBox
            height={370}
            mainDivHeight={450}
            headSize={25}
            heading="Sign Up"
            formBtn={!this.props.loader}
            func={this.signupFunc}
          >
            <View style={appInput}>
              <AppInput
                label="Email"
                value={_email}
                onChange={_email => this.setState({ _email })}
              />
              <AppInput
                label="Mobile Number"
                keypadType="phone-pad"
                value={_number}
                onChange={_number => this.setState({ _number })}
              />
              <AppInput
                secure={true}
                label="Password"
                value={_password}
                onChange={_password => this.setState({ _password })}
              />
              <AppInput
                secure={true}
                label="Confirm Password"
                value={_confirmPassword}
                onChange={_confirmPassword => this.setState({ _confirmPassword })}
              />
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
    ...bindActionCreators({ signupAction }, dispatch),
    error: (message, errNNotify) => {
      dispatch(error(message, errNNotify))
    },
    storePlaceOrderDataAfterAuth: (orderData, navigation, userData) => {
      dispatch(storePlaceOrderDataAfterAuth(orderData, navigation, userData))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);