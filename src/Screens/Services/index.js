// import React from 'react';
import { View, AsyncStorage } from 'react-native';
// Container
import React, { Component } from 'react';

import AppContainer from '../../Containers/AppContainer';
import ServicesContainer from '../../Containers/ServicesContainer';
import { checkAreaAction, error, storeUserInfo,getUserProfileData } from "../../Store/Action/authAction";
import { connect } from 'react-redux';

class Services extends Component {
  constructor(props) {
    super(props);
    this.props.storeUserInfo();
    this._retrieveUserProfileData();
    this.state = {
      error: false

    }
    this.route = this.route.bind(this)
  }

  _retrieveUserProfileData = async () => {
    let userData = await AsyncStorage.getItem('userData');
      userData = JSON.parse(userData);
      console.log(userData, 'userData')
      if (userData && userData.user_detail && !userData.user_detail.address1 && userData.user_detail.id) {
        console.log('truthy');
        this.props.getUserProfileData(userData.user_detail.id, userData.token);
      }
    }
  componentWillMount() {
    console.log("props,bablu")
    const data = this.props.navigation.getParam('data', 'NO-ID');
    console.log(data, "****data****")
    this.setState({
      data
    })
  }
  quantity(orderArr) {
    let dataClon = this.state.data
    dataClon.orderArr = orderArr
    console.log("last1 final obj", dataClon)
    this.setState({
      data: dataClon
    })
    // services("bablu")
  }
  route() {
    // alert("work")
    console.log(this.props, "propsprops")
    if (this.state.data && this.state.data.orderArr && Object.keys(this.state.data.orderArr).length > 0) {
      this.props.navigation.navigate("Checkout", { data: this.state.data })
    }
    else {
      console.log(this.props.userInfoos,"55userInfouserInfo")
      // this.setState({
      //   error:true
      // })

      // setTimeout(()=>{
      //   this.setState({
      //     error:false
      //   })
      // },3000)
    }


  }
  render() {
    return (
      <AppContainer
        hideBottomMask={true}
        footerButtonBack={true}
        footer={true}
        header={true}
        title="SERVICES"
        maskHeight='20%'
        maskWidth='65%'
        footerButton={true}
        // data={this.state.data}
        footerText={true}
        // error={this.state.error}
        // route="Checkout"
        func={this.route}

      // route={this.route()}
      // price={"true"}
      >
        <ServicesContainer func={(orderArr) => this.quantity(orderArr)} />
      </AppContainer>
    );
  }
}

// const Services = (props,bablu) => {
// console.log(props,bablu,"props,bablu")
//   const data = props.navigation.getParam('data', 'NO-ID');
//   console.log(data,"****data****",)
//   return (
//     <AppContainer
//       hideBottomMask={true}
//       footer={true}
//       header={true}
//       title="SERVICES"
//       maskHeight='20%'
//       maskWidth='65%'
//       footerButton={true}
//       data={data}
//       footerText={true}
//       route="Checkout"
//       // price={"true"}
//     >
//       <ServicesContainer  func={(quantityNPrice) => this.quantity(quantityNPrice)}/>
//     </AppContainer>
//   );
// }


let mapStateToProps = state => {
  return {
    userInfoos: state.root.userInfo,
    error: state.root.error,

  };
};
const mapDispatchToProps = dispatch => {
  return {
    storeUserInfo: () => {
      dispatch(storeUserInfo())
    },
    getUserProfileData: (userId, token) => {
      dispatch(getUserProfileData(userId, token))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Services);