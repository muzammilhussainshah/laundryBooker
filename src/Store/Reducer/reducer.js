import ActionTypes from '../Constant/constant';

const INITIAL_STATE = {
  shop_id: '',
  addressDetail: null,
  orderData: null,
  loader: false,
  error: false,
  userInfo: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SHOP_ID:
      return ({
        ...state,
        shop_id: action.payload
      })
    case ActionTypes.ADDRESS_DATA:
      return ({
        ...state,
        addressDetail: action.payload
      })
    case ActionTypes.ORDER_DATA:
      return ({
        ...state,
        orderData: action.payload
      })
    case ActionTypes.SIGNOUT:
      return ({
        ...state,
        shop_id: '',
        addressDetail: null,
        orderData: null
      })

    case ActionTypes.PLACEORDERDATA:
      return ({
        ...state,
        orderData: action.payload
      })
    case ActionTypes.LOADER:
      return ({
        ...state,
        loader: action.payload
      })
    case ActionTypes.ERROR:
      return ({
        ...state,
        error: action.payload
      })
    case ActionTypes.STOREUSERINFO:
      return ({
        ...state,
        userInfo: action.payload
      })
      case ActionTypes.UPDATE_USER_PROFILE_DATA:
        console.log(action.payload,'action.payload')
        let updatedUserData= state.userInfo;
        updatedUserData.user_detail = action.payload
          
        return ({
          ...state,
          userInfo: updatedUserData
        })
     

      
    default:
      return state;
  }

}