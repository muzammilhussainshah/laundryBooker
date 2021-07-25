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
// import { stat } from 'fs';
const changePassUrl = `http://laundary.debughands.com/api/change_password/`

const appInput = { width: '80%', paddingTop: '3%' }

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = { _email: '', _password: '', userData: "",cnf_password:"" }


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
            this.setState(userData)
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
    ChangePassword = () => {

        const { _password, cnf_password} = this.state
        let obj={"password":_password}
        let id = this.props.userInfo.user_detail.id
        console.log(this.props.userInfo.user_detail.id, "userInfouserInfouserInfo", `${changePassUrl+id}`, _password)
        if(_password===cnf_password){

            fetch(`${changePassUrl+id}`, {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => {
                // return res.json()
                this.props.error("Password change succesfully", "notify")
                console.log(res, "reschange pass")

            }).catch(err => {
                // let error = JSON.stringify(err)
                console.log(JSON.stringify(err), "errrrrchange pass")
            })
        }
        else{
            this.props.error("Password does not match", "err")
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

        const { _email, _password,cnf_password } = this.state
        return (
            <AppContainer hideBottomMask={true}     >
                <View style={{ width: '100%', marginTop: '20%' }}>
                    <CircularBox
                        height={200}
                        mainDivHeight={390}
                        headSize={25}
                        heading="New password"
                        func={this.ChangePassword}
                        formBtn={!this.props.loader}
                    >
                        <View style={appInput}>
                            {/* <AppInput
                label="Email"
                value={_email}
                onChange={_email => this.setState({ _email })}
              /> */}
                            <View >
                                <AppInput
                                    secure={true}
                                    label="Password"
                                    value={_password}
                                    onChange={_password => this.setState({ _password })}
                                />
                                <AppInput
                                    secure={true}
                                    label="Confirm Password"
                                    value={cnf_password}
                                    onChange={cnf_password => this.setState({ cnf_password })}
                                />
                                {/* <TouchableOpacity style={{ alignSelf: 'flex-end', paddingTop: '4%' }}>
                  <Text style={labelStyle}>
                    Forgot Password?
              </Text>
                </TouchableOpacity> */}
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
        userInfo: state.root.userInfo,
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);