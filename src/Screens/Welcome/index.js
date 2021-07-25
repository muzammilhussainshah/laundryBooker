import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux'
import { appInput } from './styles'
import AppContainer from '../../Containers/AppContainer';
import CircularBox from '../../Components/CircularBox/CircularBox';
import AppInput from '../../Components/TextInput'
import { checkAreaAction, loader } from "../../Store/Action/authAction";
import AsyncStorage from '@react-native-community/async-storage';
// import console = require('console');
import {NavigationEvents} from 'react-navigation'

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = { _postcode: '', }
  }

  checkArea = () => {
    console.log("work")
    const { _postcode } = this.state;
    this.props.checkAreaAction(_postcode, this.props.navigation)
    this.setState({
      _postcode:""
    })
    // .then(() => {
    //   // this.props.navigation.navigate("AddressDetail")
    //   this.setState({
    //     loaderFlag:true
    //   })
    //   this.props.navigation.navigate("Pickup",{_postcode:_postcode});

    // })


  }
  componentWillMount() {
    // alert(this.props.loader)
    this._retrieveData()
  }
  _retrieveData = async () => {
    console.log("userData")
    try {
      const userData = await AsyncStorage.getItem('authToken');
      console.log(userData, "****userData***")
      this.setState({
        userData
      })

    } catch (error) {
      console.log(error, "asynkgeterror");
    }
  };
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
    console.log(this.props.error,"errorerrorerrorerror")
    const { _postcode, loaderFlag } = this.state
    return (
      <AppContainer hideBottomMask={true} 
        footerLink={this.state.userData ? false : true}
      >
          <NavigationEvents onDidFocus = {()=> this._retrieveData()} />
        <View style={{ width: '100%', marginTop: '35%', }}>
          <CircularBox
            height={190}
            mainDivHeight={400}
            heading="Welcome!"
            subheading="Check if we deliver in your area"
            formBtn={!this.props.loader}
            func={this.checkArea}
          >
            <View style={appInput}>
              <AppInput
                label="Your Postcode"
                value={_postcode}
                onChange={_postcode => this.setState({ _postcode })}
              />
            </View>
            {(this.props.error) ? (
              this.err(this.props.error)
            ) : (null)}

          </CircularBox>
        </View>
      </AppContainer >
    );
  }
}
// const mapDispatchToProps = dispatch => {
//   return {
//     ...bindActionCreators({ checkAreaAction }, dispatch)
//   }
// }


let mapStateToProps = state => {
  return {
    loader: state.root.loader,
    error: state.root.error,

  };
};
function mapDispatchToProps(dispatch) {
  return ({
    checkAreaAction: (_postcode, navigation) => {
      dispatch(checkAreaAction(_postcode, navigation))
    },
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);