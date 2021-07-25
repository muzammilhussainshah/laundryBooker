import React, { Component } from 'react';
import { View,Text,AsyncStorage } from 'react-native';
import CircularBox from '../../Components/CircularBox/CircularBox';
import AppInput from '../../Components/TextInput'
import CustomText from '../../Components/CustomText'
import AppContainer from '../../Containers/AppContainer';
import {error, signupAction,storeUserInfo, getUserProfileData} from '../../Store/Action/authAction';
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux';

const appInput = { width: '80%', paddingTop: '3%' }

class Checkout extends Component {
   constructor(props) {
    super(props);
    this.props.storeUserInfo();
    this._retrieveUserProfileData();
    console.log(this.props.userInfo,'*******aa')
    this.state = {
      verification:true, _firstname: '', _lastname: '',
      _address:(this.props.userInfo && this.props.userInfo.user_detail.address1)?(this.props.userInfo.user_detail.address1):'',
      _street:(this.props.userInfo && this.props.userInfo.user_detail.address2)?(this.props.userInfo.user_detail.address2):'',
      _town:(this.props.userInfo && this.props.userInfo.user_detail.city)?(this.props.userInfo.user_detail.city):'',
       email: '',
        _mobile: ''
        ,password:'',

    details:{
      _firstname: '',
       _lastname: '',
       _address:(this.props.userInfo && this.props.userInfo.user_detail.address1)?(this.props.userInfo.user_detail.address1):'',
       _street:(this.props.userInfo && this.props.userInfo.user_detail.address2)?(this.props.userInfo.user_detail.address2):'',
       _town:(this.props.userInfo && this.props.userInfo.user_detail.city)?(this.props.userInfo.user_detail.city):'',
       email: '',
        _mobile: '',
        password:''
    }
   }
  }
  _retrieveUserProfileData = async () => {
  let userData = await AsyncStorage.getItem('userData');
    userData = JSON.parse(userData);
    console.log(userData, 'userData')
    if (userData && userData.user_detail && !userData.user_detail.address1 && userData.user_detail.id) {
      console.log('truthy');
      this.props.getUserProfileData(userData.user_detail.id, userData.token);
    }
    else{
      console.log('falsy')
    }
  }

  componentWillMount() {
    console.log("checkout***", this.props.userInfo)
    // const {_firstname,_lastname,_address,_street,_town,email,_mobile}=this.state;
    const data = this.props.navigation.getParam('data', 'NO-ID');
   
    console.log(data, "****checkoutdata****",)
    this.setState({
      data
    })
  }
  onChange(value,name){
    console.log(value,"value")
    let detailsClone = this.state.details
    let dataClone = this.state.data
    detailsClone[name] = value
    dataClone.details = detailsClone
    this.setState({
      [name]:value,
      data:dataClone,
      details:detailsClone

    },()=>{    
    console.log(this.state.data,"detailsClone")

    })

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
  rout(){
    if(this.props.userInfo){
      
    // alert("work")
    let flag = true
    if(this.state.details!==""){
      console.log(this.state.details,"this.state.details")
      let obj = this.state.details
      for(var key in obj){
        if(!this.props.userInfo){
          if(obj[key]===""){
            console.log("console",obj[key],obj)
           flag=false
            this.props.error("all fields are required","err")
          }
        }
        else{
          if(obj[key]==="" && (key ==='_address' || key === '_street' || key === '_town' )){
            console.log("console",obj[key],obj)
           flag=false
            this.props.error("all fields are required","err")
          }
        }

      }
    }
    this.setState({
      verification:flag
    },()=>{
      if(this.state.verification){
        // this.props.navigation.navigate("Checkout",{data:this.state.data})
        const orderWizeredData = this.props.navigation.getParam('data');
        orderWizeredData.deliveryDetails = this.state.details
        orderWizeredData.details = this.state.details

        console.log(orderWizeredData,'=> inside checkout');
        this.props.navigation.navigate("Basket", {data:orderWizeredData})
      }
    })

    }
    else{
      const { email, password, _mobile } = this.state

      let that = this;
      let obj = {
        email: email,
        password:password,
        mobile_number: _mobile
      }
      this.props.signupAction(obj)
      .then((userData) => {
        const orderWizeredData = that.props.navigation.getParam('data');
        orderWizeredData.deliveryDetails = that.state.details
        
        console.log(userData, orderWizeredData, 'orderWizeredDataorderWizeredDataorderWizeredData')
        that.props.navigation.navigate("Basket", {data:orderWizeredData})
      })
      .catch((err)=>{
        console.log(err,'error found in signup')
      })
    }

  }
  render() {
  
    const { _firstname, email, _lastname,_address,_street,_postal_code,_town, _mobile, password } = this.state
    return (
      <AppContainer 
      footerButton={true}
      footerButtonBack={true}
       hideBottomMask={true} 
       footer={true} 
        // footerText={true}
        header={true} 
      data={this.state.data}
      title="Checkout" 
      func={()=>this.rout()}
      // route={verification===true?"PaymentDetails":null}
      >
        <View>
          <CircularBox
            height={this.props.userInfo?300:700}
            mainDivHeight={470}
            headSize={25}
            hideLoader={true}
            heading="Your Details"
          >
           {
             (this.props.userInfo)?(
              <View style={appInput}>
             
            
              <AppInput
                label="Address"
                value={_address}
                onChange={_address => this.onChange(_address,"_address")}
              />
              <AppInput
                label="Street"
                value={_street}
                onChange={_street => this.onChange(_street,"_street")}
              />
            
              <AppInput
                label="Town"
                value={_town}
                onChange={_town => this.onChange(_town,"_town")}
              />
            
               {(this.props.errorInStore) ? (
              this.err(this.props.errorInStore)
            ) : (null)}
            </View>
             ):(
              <View style={appInput}>
              <AppInput
                label="First name"
                value={_firstname}
                onChange={_firstname => this.onChange(_firstname,"_firstname")}
              />
              <AppInput
                label="Last name"
                value={_lastname}
                onChange={_lastname => this.onChange(_lastname,"_lastname")}
              />
              <AppInput
                label="Address"
                value={_address}
                onChange={_address => this.onChange(_address,"_address")}
              />
              <AppInput
                label="Street"
                value={_street}
                onChange={_street => this.onChange(_street,"_street")}
              />
            
              <AppInput
                label="Town"
                value={_town}
                onChange={_town => this.onChange(_town,"_town")}
              />
              <AppInput
                label="E-mail"
                value={email}
                onChange={email => this.onChange(email,"email")}
              />
              <AppInput
                label="Password"
                value={password}
                secure={true}
                onChange={password => this.onChange(password,"password")}
              />
              <AppInput
                label="Mobile Number"
                value={_mobile}
                onChange={_mobile => this.onChange(_mobile,"_mobile")}
              />
               {(this.props.errorInStore) ? (
              this.err(this.props.errorInStore)
            ) : (null)}
            </View>
             )
           }
          </CircularBox>

         <View style={{ marginTop:this.props.userInfo?100:300,backgroundColor: '#4C44AF', width: '80%', height: 200, alignSelf: 'center', marginBottom: 10, borderRadius: 12 }}>
            <View style={{alignSelf:'center',width:'80%',paddingVertical:'7%'}}>
            <CustomText
              align="center"
              text="I want to receive exclusive Laundtech
              news and special offers"
              textSize={12}
              />
              </View>
            <View style={{alignSelf:'center',width:'90%',paddingVertical:'9%'}}>
            <CustomText
              align="center"
              text="I accept the Laundtech Terms & Conditions"
              textSize={12}
              />
              </View>
          </View> 

        </View>
      </AppContainer>
    );
  }
}

let mapStateToProps = state => {
  return {
    loader: state.root.loader,
    errorInStore: state.root.error,
    userInfo: state.root.userInfo
  };
};
function mapDispatchToProps(dispatch) {
  return ({
    error: (message, errNNotify) => {
      dispatch(error(message, errNNotify))
    },
    storeUserInfo: () => {
      dispatch(storeUserInfo())
    },
    ...bindActionCreators({ signupAction }, dispatch),
    getUserProfileData: (userId, token) => {
      dispatch(getUserProfileData(userId, token))
    },

    
    // signupAction:(userCredentials)=>{
    //   dispatch(signupAction(userCredentials))
    // }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
// export default Checkout;