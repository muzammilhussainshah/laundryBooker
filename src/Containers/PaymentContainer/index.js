import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity ,Text} from 'react-native';
import CircularBox from '../../Components/CircularBox/CircularBox'
import { connect } from 'react-redux';
import AppInput from '../../Components/TextInput';
import CustomText from '../../Components/CustomText';
import CustomDatePicker from '../../Components/DatePicker';

const appInput = { width: '80%', paddingTop: '3%' }

class PaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _email: '',
      _password: '',
      _cardHolderName: '',
      _cardNumber: '',
      _issueNumber: '',
      _cvv: '',
      saveInfo: false,
      _payment: 'Credit Card',
      _paymentObj: {},
      _validFrom: '',
      _valiTill: ''
    }
  }

  switchButton(label) {
    return (
      <TouchableOpacity
        style={[styles.btnStlye, this.state._payment == label ? { backgroundColor: '#1FFFFF' } : {}]}
        onPress={() => this.setState({ _payment: label })}>
        <View>
          <CustomText text={label} textSize={18} textWeight="bold" />
        </View>
      </TouchableOpacity>
    )
  }

  saveCheckbox() {
    return (
      <TouchableOpacity onPress={() => this.setState({ saveInfo: !this.state.saveInfo })}>
        <View style={styles.quantityContainer}>

        </View>
      </TouchableOpacity>
    );
  }
  onChange(val, name) {
    console.log(val, name,"val, name")
    let _paymentObjClone = this.state._paymentObj
    _paymentObjClone[name] = val

    this.setState({
      [name]: val, _paymentObj: _paymentObjClone
    })
    this.props.func(_paymentObjClone)
  }
  err(error) {
    console.log(error, "erre")
    return (
      <View>
        <Text style={{ color: error[1] === "err" ? "red" : "yellow" }}>
          {error[0]}
        </Text>
      </View>
    )
  }
  render() {
    const { _cardHolderName, _cardNumber, _issueNumber, _cvv, _payment, _email, _password, _valiTill, _validFrom } = this.state
    return (
      <View>
        <View style={{ marginBottom: '10%' }}>
          <Greeting heading="Payment Details" />
        </View>
        <View style={styles.btnContainer}>
          {/* {this.switchButton('Pay Pal')} */}
          {this.switchButton('Credit Card')}
        </View>
        {
          _payment == "Credit Card" ?
            <CircularBox
              hideLoader={!this.props.loader}
              height={300}
              mainDivHeight={470}
            // formBtn={!this.props.loader}

            >
              <View style={appInput}>
                {/* <AppInput
                  label="Cardholder Name"
                  value={_cardHolderName}
                  onChange={_cardHolderName => this.setState({ _cardHolderName })}
                /> */}
                <AppInput
                  label="Card Number"
                  value={_cardNumber}
                  onChange={_cardNumber => _cardNumber.length < 17 ? this.onChange(_cardNumber, "_cardNumber") : null}
                />
                {/* <AppInput
                  label="Issue No (optional)"
                  value={_issueNumber}
                  onChange={_issueNumber => this.setState({ _issueNumber })}
                /> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CustomDatePicker
                    getDate={_validFrom => this.onChange(_validFrom, "_validFrom")}
                    label="Valid From"
                    value={_validFrom} />
                  <CustomDatePicker
                    getDate={_valiTill => this.onChange(_valiTill, "_valiTill")}
                    label="Valid Until"
                    value={_valiTill} />
                </View>
                <AppInput
                  width="40%"
                  label="CVV"
                  value={_cvv}
                  onChange={_cvv => this.onChange(_cvv, "_cvv")}
                />
                {/* <View style={{ flexDirection: 'row', paddingVertical: 30, alignItems: 'center' }}>
                  {this.saveCheckbox()}
                  <CustomText text="Save credit card information" textSize={12} textWeight="bold" />
                </View> */}
                {(this.props.errorInStore) ? (
              this.err(this.props.errorInStore)
            ) : (null)}
              </View>
            </CircularBox> :
            <CircularBox
              hideLoader={true}
              height={220}
              mainDivHeight={250}
            >
              <View style={appInput}>
                <AppInput
                  label="E-mail"
                  value={_email}
                  onChange={_email => this.setState({ _email })}
                />
                <AppInput
                  label="Password"
                  value={_password}
                  onChange={_password => this.setState({ _password })}
                />
                {/* {(this.props.errorInStore) ? (
              this.err(this.props.errorInStore)
            ) : (null)} */}
              </View>
            </CircularBox>
        }
      </View >
    );
  }
}
const styles = StyleSheet.create({
  btnContainer: { flexDirection: 'row', width: '80%', height: 100, marginTop: 40, marginBottom: 10, alignSelf: 'center', justifyContent: 'center' },
  btnStlye: { width: '45%', height: 60, backgroundColor: '#4C44AF', borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  quantityContainer: { marginHorizontal: '5%', height: 23, width: 23, borderWidth: 1, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' }
});


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
    error: (message, errNNotify) => {
      dispatch(error(message, errNNotify))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentContainer);
// export default PaymentContainer;