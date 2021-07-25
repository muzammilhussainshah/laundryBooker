import ActionTypes from '../Constant/constant';
import AsyncStorage from '@react-native-community/async-storage';
const baseUrl = `http://laundary.debughands.com/api/`



const _storeToken = async (token, user, reject) => {
  let userData = JSON.stringify(user)
  console.log(token, user, "token,user, reject", userData)
  try {
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('userData', userData);

    return;
  } catch (error) {
    console.log(error, "error")
    alert("Something went wrong.")
    reject()
  }
  // try {
  //   await AsyncStorage.setItem('userData', userData);
  //   return;
  // } catch (error) {
  //   console.log(error,"error")
  //   alert("Something went wrong.")
  //   reject()
  // }
};

export function signupAction(obj) {
  return dispatch => {
    dispatch(loader(true));

    console.log(obj, "sending----")
    console.log(JSON.stringify(obj), "sending----")
    return new Promise(function (resolve, reject) {
      fetch(`${baseUrl}create-customer`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => {
        return res.json()
      }).then(response => {
        dispatch(loader(false));

        console.log(response, "response from backend")
        if (response.results.token) {
          _storeToken(response.results.token, response.results, reject);
          let objData = {
            token: response.results.token,
            result: response.results
          }
          dispatch({ type: ActionTypes.STOREUSERINFO, payload: response.results })
          resolve(objData)
        } else if (response.results.email) {
          dispatch(error(response.results.email[0], "err"));

          // alert(response.results.email[0])
        }
      })
    })
  }
}
export function signinAction(obj) {
  return dispatch => {
    dispatch(loader(true));

    console.log(obj, "sending----")
    console.log(JSON.stringify(obj), "sending----")
    return new Promise(function (resolve, reject) {
      fetch(`${baseUrl}login`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => {
        return res.json()
      }).then(response => {
        dispatch(loader(false));

        console.log(response, "response from backend")
        if (response.results.token) {
          _storeToken(response.results.token, response.results, reject);
          let objData = {
            token: response.results.token,
            result: response.results
          }
          dispatch({ type: ActionTypes.USER_DETAILS, payload: response.results })
          resolve(objData)
        }
         else if(response.results.error) {
          dispatch(error(response.results.error, "err"));

          // alert('Sorry we donot deliver in your area.')
        }
        // else{
        //   dispatch(error('Sorry we donot deliver in your area.', "err"));
        // }
      })
    })
  }
}

export function loader(bolean) {
  return dispatch => {
    dispatch({ type: ActionTypes.LOADER, payload: bolean })

  }
}

export function error(message, errNNotify) {
  console.log("error in auth", message, errNNotify)
  // alert(message)
  return dispatch => {
    dispatch({ type: ActionTypes.ERROR, payload: [message, errNNotify] })
    setTimeout(() => {
      dispatch({ type: ActionTypes.ERROR, payload: false })


    }, 3000)

  }
}


export function checkAreaAction(_postcode, navigation) {
  return dispatch => {
    dispatch(loader(true));

    return new Promise(function (resolve, reject) {
      fetch(`${baseUrl}check-postal-code`, {
        method: "POST",
        body: JSON.stringify({ postal_code: _postcode }),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => {
        return res.json()
      }).then(response => {
        dispatch(loader(false));
        console.log(response, "3response from backend")
        if (response.results.shop_id) {
          navigation.navigate("Pickup", { _postcode: _postcode });
          dispatch({ type: ActionTypes.SHOP_ID, payload: response.results.shop_id })
          resolve();
        }
        else if (response.results.postal_code) {
          dispatch(error(response.results.postal_code[0], "err"));
          // alert(response.results.postal_code[0])
        } else {
          dispatch(error('Sorry we donot deliver in your area.'));
          setTimeout(() => {
            navigation.navigate("AddressDetail")

          }, 3500)
          // alert('Sorry we donot deliver in your area.')
        }
      })
    })
  }
}




export function storePlaceOrderData(placeOrderData, navigation, userData) {



  console.log(placeOrderData, "placeOrderData6666", userData)
  let userDataParse = userData
  // console.log(userDataParse.user_detail, "userDataParse")
  return dispatch => {
    if (!userData) {
      dispatch({ type: ActionTypes.PLACEORDERDATA, payload: placeOrderData })
      navigation.navigate("Signin", { OrderStatus: "OrderStatus" })
    }
    else {
      dispatch(loader(true));

      // let customer_id=userData.id
      let placeOrderDataClone = placeOrderData
      placeOrderDataClone.obj.customer_id = userDataParse.user_detail.id

      console.log(placeOrderDataClone, "finalobj")
      let obj = {}
      obj.shop_id = placeOrderDataClone.obj.shop_id
      obj.customer_id = placeOrderDataClone.obj.customer_id
      obj.pick_up_time = placeOrderDataClone._pickupObj.pick_up_range
      obj.drop_off_time = placeOrderDataClone._dropoffObj.drop_off_range
      obj.house_number = placeOrderDataClone.details._address
      obj.street = placeOrderDataClone.details._street
      obj.postal_code = placeOrderDataClone._pickupObj._postcode
      obj.town = placeOrderDataClone.details._town
      obj.start_pickup_time = placeOrderDataClone._pickupObj.pick_up_time_from
      obj.end_pickup_time = placeOrderDataClone._pickupObj.pick_up_time_to
      obj.start_drop_off_time = placeOrderDataClone._dropoffObj.drop_off_time_from
      obj.end_drop_off_time = placeOrderDataClone._dropoffObj.drop_off_time_to
      let orderArr = placeOrderDataClone.orderArr;
      obj.order_details = [];
      obj.total = 0;
      for (var key in orderArr) {
        obj.total += orderArr[key].price * orderArr[key].quantity;
        let serviceObject = {
          "cat_id": orderArr[key].cat_id,
          "service_id": orderArr[key].id,
          "service_price": orderArr[key].price,
          "service_quantity": orderArr[key].quantity
        }
        obj.order_details.push(serviceObject)

      }



      // let price = placeOrderDataClone.quantityNPrice.priceNDetails[0].price
      // for (var key in placeOrderDataClone.quantityNPrice) {
      //   console.log(key, "keyy", [key], placeOrderDataClone.quantityNPrice[key])
      //   if (key !== "priceNDetails" && key !== "service_id") {
      //     price = price * placeOrderDataClone.quantityNPrice[key]
      //   }

      // }
      console.log(obj, "pricepriceprice")
      // obj.total = price
      // obj.order_details = []
      // for (var key in placeOrderDataClone.quantityNPrice) {
      //   console.log(key, "keyy", [key], placeOrderDataClone.quantityNPrice[key])
      //   if (key !== "priceNDetails" && key !== "service_id") {
      //     let catNserId = {
      //       cat_id: key,
      //       service_id: placeOrderDataClone.quantityNPrice.service_id,
      //       service_price: placeOrderDataClone.quantityNPrice.priceNDetails[0].price,
      //       service_quantity: placeOrderDataClone.quantityNPrice[key]
      //     }
      //     obj.order_details.push(catNserId)
      //   }

      // }


      console.log(obj.order_details, "objjjjjjj", obj)





      // return new Promise(function (resolve, reject) {
      fetch(`${baseUrl}place-order`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        },

      }).then(response => {
        dispatch(loader(false));

        dispatch({ type: ActionTypes.PLACEORDERDATA, payload: obj })
        console.log(response, "response from posted backend")
        navigation.navigate("OrderStatus")
      }).catch(err => {
        dispatch(loader(false));

        console.log(err, "errrrrr")
      })
      // })

    }


  }
}



// export function storePlaceOrderDataAfterAuth(placeOrderData, navigation, userDataparam) {


//   return dispatch => {
//     console.log(userDataparam, 'userdata inside auth after')
//     let userData = userDataparam.result
//     // console.log(data, 'data found', userData)
//     console.log(placeOrderData, "placeOrderData6666", userData)
//     let userDataParse = userData
//     // console.log(userDataParse.user_detail, "userDataParse")

//     if (!userData) {
//       dispatch({ type: ActionTypes.PLACEORDERDATA, payload: placeOrderData })
//       navigation.navigate("Signin", { OrderStatus: "OrderStatus" })
//     }
//     else {
//       // let customer_id=userData.id
//       let placeOrderDataClone = placeOrderData
//       placeOrderDataClone.obj.customer_id = userDataParse.user_detail.id

//       console.log(placeOrderDataClone, "finalobj")
//       let obj = {}
//       obj.shop_id = placeOrderDataClone.obj.shop_id
//       obj.customer_id = placeOrderDataClone.obj.customer_id
//       obj.pick_up_time = placeOrderDataClone._pickupObj.pick_up_range
//       obj.drop_off_time = placeOrderDataClone._dropoffObj.drop_off_range
//       obj.house_number = placeOrderDataClone.details._address
//       obj.street = placeOrderDataClone.details._street
//       obj.postal_code = placeOrderDataClone._pickupObj._postcode
//       obj.town = placeOrderDataClone.details._town
//       obj.start_pickup_time = placeOrderDataClone._pickupObj.pick_up_time_from
//       obj.end_pickup_time = placeOrderDataClone._pickupObj.pick_up_time_to
//       obj.start_drop_off_time = placeOrderDataClone._dropoffObj.drop_off_time_from
//       obj.end_drop_off_time = placeOrderDataClone._dropoffObj.drop_off_time_to

//       let price = placeOrderDataClone.quantityNPrice.priceNDetails[0].price
//       for (var key in placeOrderDataClone.quantityNPrice) {
//         console.log(key, "keyy", [key], placeOrderDataClone.quantityNPrice[key])
//         if (key !== "priceNDetails" && key !== "service_id") {
//           price = price * placeOrderDataClone.quantityNPrice[key]
//         }

//       }
//       console.log(price, "pricepriceprice")
//       obj.total = price
//       obj.order_details = []
//       for (var key in placeOrderDataClone.quantityNPrice) {
//         console.log(key, "keyy", [key], placeOrderDataClone.quantityNPrice[key])
//         if (key !== "priceNDetails" && key !== "service_id") {
//           let catNserId = {
//             cat_id: key,
//             service_id: placeOrderDataClone.quantityNPrice.service_id,
//             service_price: placeOrderDataClone.quantityNPrice.priceNDetails[0].price,
//             service_quantity: placeOrderDataClone.quantityNPrice[key]
//           }
//           obj.order_details.push(catNserId)
//         }

//       }


//       console.log(obj.order_details, "objjjjjjj", obj)





//       fetch(`${baseUrl}place-order`, {
//         method: "POST",
//         body: JSON.stringify(obj),
//         headers: {
//           'Content-Type': 'application/json'
//         },

//       }).then(response => {
//         dispatch({ type: ActionTypes.PLACEORDERDATA, payload: obj })
//         console.log(response, "response from posted backend")
//         if (response.status === 200) {
//           navigation.navigate("OrderStatus")
//         }
//         else {
//           dispatch(error('Something went wrong, please try again.', "err"));

//         }
//       }).catch(err => {
//         console.log(err, "errrrrr")
//       })




//     }


//   }
// }




export function storeUserInfo() {
  return dispatch => {

    AsyncStorage.getItem('userData')
      .then((userInfo) => {
        let userInfoData = JSON.parse(userInfo);
        console.log(userInfoData, '***//***');
        dispatch({ type: ActionTypes.STOREUSERINFO, payload: userInfoData })

      })


  }
}




export function getUserProfileData(userId, token) {
  return dispatch => {
    console.log(userId,'userId')
    fetch(`${baseUrl}profile/${userId}`).then(res => {
      return res.json()
    }).then(response => {
      console.log(response, 'data received');
      let obj = {
        token: token,
        user_detail: response.results
      }
      _storeUserData(obj);
      dispatch({ type: ActionTypes.UPDATE_USER_PROFILE_DATA, payload:response.results })

    })

  }
}




const _storeUserData = async (userData) => {
  let userUpdatedData = JSON.stringify(userData)
    await AsyncStorage.setItem('userData', userUpdatedData);
  }