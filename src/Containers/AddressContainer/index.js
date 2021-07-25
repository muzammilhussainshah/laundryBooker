import React, { Component } from 'react';
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { bindActionCreators } from "redux";
import { View, StyleSheet, ToastAndroid ,Text} from 'react-native';
import MapView from 'react-native-maps';
import CircularBox from '../../Components/CircularBox/CircularBox'
import AppInput from '../../Components/TextInput'
import { customerRequestAction ,error} from "../../Store/Action/requestAction";
// import {  } from "../../Store/Action/authAction";

const appInput = { width: '80%', paddingTop: '3%' }

class AddressContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _houseNum: '',
      _street: '',
      _town: '',
      _postCode: ''
    }
  }

  customerRequest = () => {
    const { _houseNum, _street, _town, _postCode } = this.state
    let obj = {
      house_number: _houseNum,
      street: _street,
      postal_code: _postCode,
      town: _town,
    }
    console.log(obj)
    if (_houseNum !== "" && _street !== "" && _town !== "" && _postCode !== "") {
      this.props.customerRequestAction(obj)
      
      // .then(response => {
      //   // alert(response)
      //   ToastAndroid.showWithGravityAndOffset(
      //     response,
      //     ToastAndroid.SHORT,
      //     ToastAndroid.BOTTOM,
      //     25,
      //     50,
      //   );
      //   // ToastAndroid.show(response, ToastAndroid.SHORT);
      //   // this.props.navigation.navigate("Pickup")
        // alert('We have received your request, thanks.')

      // })
    } else {
      this.props.error("All fields are required.","err")
      // alert("All fields are required.")
    }
  }
  err(error) {
    return (
      <View>
        <Text style={{color:error[1]==="err"?"red":"yellow"}}>
          {error[0]}
        </Text>
      </View>
    )
  }
  render() {
    console.log(this.props.errorInStore,"error")
    const { _houseNum, _street, _town, _postCode } = this.state
    return (
      <View>
        <View>
          <Greeting
            heading="Your Address"
            subheading="Select Your address"
          />
        </View>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
          </MapView>
        </View>
        <CircularBox
          height={350}
          mainDivHeight={400}
          formBtn={true}
          func={this.customerRequest}
        >
          <View style={appInput}>
            <AppInput
              label="House/Flat number"
              value={_houseNum}
              onChange={_houseNum => this.setState({ _houseNum })}
            />
            <AppInput
              label="Street"
              value={_street}
              onChange={_street => this.setState({ _street })}
            />
            <AppInput
              label="Postcode"
              value={_postCode}
              onChange={_postCode => this.setState({ _postCode })}
            />
            <AppInput
              label="Town"
              value={_town}
              onChange={_town => this.setState({ _town })}
            />

{(this.props.errorInStore) ? (
              this.err(this.props.errorInStore)
            ) : (null)}
          </View>
        </CircularBox>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
    width: '80%',
    marginHorizontal: '10%',
    marginTop: '15%',
    marginBottom: '5%',
    position: 'relative', borderRadius: 12
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


// let mapStateToProps = state => {
//   return {
//     // shop_id: state.root.shop_id
//     error: state.root.error

//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     ...bindActionCreators([customerRequestAction, error] , dispatch)
//     // ...bindActionCreatorsClone({ error }, dispatch)
//   }
// }

let mapStateToProps = state => {
  return {
    loader: state.root.loader,
    errorInStore: state.root.error,

  };
};
function mapDispatchToProps(dispatch) {
  return ({
    customerRequestAction: (obj) => {
      dispatch(customerRequestAction(obj))
    },
    error: (message,errNNotify) => {
      dispatch(error(message,errNNotify))
    },
  })
}


// const mapDispatchToProps=(dispatch)=> {
//   return ({
//     customerRequestAction: (obj) => {
//       dispatch(customerRequestAction(obj))
//     },
//     error: (message) => {
//       dispatch(error(message))
//     },
//   })
// }
export default connect(mapStateToProps, mapDispatchToProps)(AddressContainer);

// export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AddressContainer));
// export default AddressContainer