import React, { Component } from 'react';
import { View } from 'react-native';
// styles
// Container
import AppContainer from '../../Containers/AppContainer';
//component
import CircularBox from '../../Components/CircularBox/CircularBox';
import AppInput from '../../Components/TextInput'
const appInput = { width: '80%', paddingTop: '3%' }

class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = { _email: '', _mobileNumber: '' }
  }
  render() {
    const { _email, _mobileNumber } = this.state
    return (
        <AppContainer hideBottomMask={true} footerLink={true}>
        <CircularBox
        height={315}
        mainDivHeight={415}
        headSize={20}
        heading="On its way there!" 
        subheading="Enter your e-mail or mobile number to
                      be notified when we are in the area" 
        formBtn={true}
        route="Thanking"
        >
          <View style={appInput}>
            <AppInput
              label="Email"
              value={_email}
              onChange={_email => this.setState({ _email })}
            />
            <View style={{paddingTop:20}}>
            <AppInput
              label="Mobile Number"
              value={_mobileNumber}
              onChange={_mobileNumber => this.setState({ _mobileNumber })}
              />
              </View>
          </View>
        </CircularBox>
      </AppContainer >
    );
  }
}

export default Subscription;