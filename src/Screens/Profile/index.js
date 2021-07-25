import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, FlatList , Platform  ,Text  , TextInput } from 'react-native';
import AppContainer from '../../Containers/AppContainer';
//component
import CircularBox from '../../Components/CircularBox/CircularBox';
import { connect } from 'react-redux';
import { storeUserInfo } from '../../Store/Action/authAction'
import RenderList from "../../Components/RenderList";
import { TouchableOpacity } from 'react-native-gesture-handler';
const url = `http://laundary.debughands.com/api/profile/`
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userInfo : {
        first_name: '',
        last_name: '',
        mobile_number: '',
        email: '',
        city : '',
        country : '',
        address1 : '',
        address2 : ''
        },
        edit : false,
        
    }
  }
  componentDidMount(){
this.getUserProfile(this.props.userInfo.user_detail.id)
  }

  editButton = ()=>{
      this.setState({edit : !this.state.edit})
  }

getUserProfile = (id)=>{
    fetch(`${url + id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => {
        return res.json()
      }).then(response => {
          console.log(response.results)
          this.setState({userInfo : response.results})
      })
}
userFields = (title, value , openInput) => {
    const { userInfo, edit } = this.state
    return (
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: '21%',
          width : '95%',
          marginVertical : 6,
          height: 60,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16  , fontWeight : 'bold' , height : 20 }}>{title}</Text>
        {edit ? (
          <View  style = {{width : '100%' , height : 40 }}    >
            <TextInput
              style={{ height: 38, borderBottomColor: '#fff', width: '100%'  , 
              borderBottomWidth : 0.5 , color : '#fff'}}
              onChangeText={text =>{
                  if(edit){
                      let userInfo = this.state.userInfo
                      userInfo[value] = text
                      this.setState({userInfo : userInfo})
                  }
              }}
              value={userInfo[value]}
              placeholder = {title}
            />
          </View>
        ) : (
        userInfo[value] !== '' ?
        <Text style={{ color: '#fff', fontSize: 16 ,  }}> {userInfo[value]}</Text>
        :
        <Text style={{ color: 'grey', fontSize: 16 ,  }}> {title}</Text>
        )}
      </View>
    )
  }
  render() {
      let {userInfo , edit} = this.state
    return (
        <View style = {{flex : 1}}>
      <AppContainer hideBottomMask={true} footer={true} header={true} title="User Profile"
          footerButton={false} route="Welcome" >
            <CircularBox
            height={600}
            headSize={25}
            hideLoader={true}
            >
            {this.userFields('First Name'  ,'first_name' , )} 
            {this.userFields('Last Name'  ,'last_name' )} 
            {this.userFields('Email'  ,'email' )} 
            {this.userFields('Mobile Number'  ,'mobile_number' )} 
            {this.userFields('House Number'  ,'address1' )} 
            {this.userFields('Street'  ,'address2' )} 
            {this.userFields('City'  ,'city' )} 
            {this.userFields('Country'  ,'country' )} 
          </CircularBox>
      </AppContainer >
          <View style = {{alignItems : 'flex-end' , position: 'absolute', bottom  : 12 , right  :12}}>
              <TouchableOpacity 
              onPress = {this.editButton}
              style = {{height : 40 , width : 100 , borderRadius : 5 , 
                backgroundColor: '#4C44AF' , justifyContent : 'center' , alignItems : 'center'}}>
                  <Text style = {{color : '#fff' , fontSize : 14}}> {!edit ? 'Edit' : 'Save'} </Text>
              </TouchableOpacity>
        </View>
    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);