import ActionTypes from '../Constant/constant';
import AsyncStorage from '@react-native-community/async-storage';

const baseUrl = `http://laundary.debughands.com/api/`

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

export function customerRequestAction(obj, navigate) {
  return dispatch => {
    console.log(obj, "sending----")
    console.log(JSON.stringify(obj), "sending----")
    return new Promise(function (resolve, reject) {
      fetch(`${baseUrl}customer-request`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => {
        return res.json()
      }).then(response => {
        console.log(response, "response from customer-request")
        if (response.results.code === 200) {
          dispatch(error('We have received your request, thanks.',"notify"));



          dispatch({ type: ActionTypes.ADDRESS_DATA, payload: obj })
          resolve(response.results.msg)
        } else {
          alert('Sorry we donot deliver in your area.')
        }
      })
    })
  }
}

export function requestTimeRange(obj, endPoint) {
  return dispatch => {
    return new Promise(function (resolve, reject) {
      fetch(`${baseUrl}${endPoint}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => {
        return res.json()
      }).then(response => {
        console.log(response, "response from pickup Date")
        if (response.results) {
          resolve(response.results)
        } else {
          reject()
        }
      })
    })
  }
}


const _retrieveData = async (navigation, resolve, reject, obj, dispatch) => {
  try {
    const value = await AsyncStorage.getItem('authToken');
    if (value !== null) {
      // We have data!!
      console.log(value);
      fetch(`${baseUrl}place-order`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => {
        return res.json()
      }).then(response => {
        console.log(response, "response from get-drop-off")
        if (response.results) {
          resolve(response.results)
        } else {
          reject()
        }
      })
    }
    else {
      dispatch({ type: ActionTypes.ORDER_DATA, payload: obj })
      navigation.navigate('Signup')
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};

export function placeOrderAction(obj, navigation) {
  console.log("placeeeeeeeeeeeee",obj,navigation)
  return dispatch => {
    return new Promise(function (resolve, reject) {
      _retrieveData(navigation, resolve, reject, obj, dispatch)
    }
    )
  }
}