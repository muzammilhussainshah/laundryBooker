import React, { Component } from 'react';
import { View, FlatList, Dimensions, ActivityIndicator, ScrollView,Text } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import AppContainer from '../../Containers/AppContainer';
import CustomHorizontalDatePicker from '../../Components/HorizontalDatePicker'
import TimeComponent from '../../Components/TimeComponent'
import CustomText from '../../Components/CustomText'
import { requestTimeRange, placeOrderAction,error } from '../../Store/Action/requestAction';
import { date } from '../../Components/TimePicker/data';
const screenHeight = Dimensions.get('window').height * 0.27;
import AsyncStorage from '@react-native-community/async-storage';

class Dropoff extends Component {
  constructor(props) {
    super(props);
    this.state = { _pickupDate: '', _timeSlots: null, _loader: false, _pick_up_date_time: '', _dropoffObj: null, selectedDateId: '', selectedRangeId: '' }
  }

  onDateSelected = date => {
    const params = this.props.navigation.getParam('obj', {});
    console.log("Selected Date:==>", date);
    this.setState({ _pickupDate: date, _loader: true })
    let obj = {
      shop_id: params.shop_id,
      pick_up_date_time: params.pick_up_date_time,
      drop_off_date: date
    }
    console.log(obj, '*4*444')

    this.props.requestTimeRange(obj, "get-drop-off")
      .then((data) => {
        this.setState({ _timeSlots: data, _loader: false,_dropoffObj:null })
      })
  }

  onTimeSelected = (time, obj) => {
    console.log(time, "time", obj)
    this.setState({ _pick_up_date_time: time, _dropoffObj: obj, selectedRangeId: obj.id })
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <TimeComponent
      id={item.id}
      key={Number(item.id)}
      item={item}
      onTimeSelected={this.onTimeSelected} />
  )
  // _renderDateItem = ({ item }) => {
  //   const params = this.props.navigation.getParam('obj', {});
  //   console.log(params, "paramsparams")
  //   return (
  //     <CustomHorizontalDatePicker
  //       id={item.id}
  //       key={item.id}
  //       item={item}
  //       onDateSelected={this.onDateSelected}
  //       dateRange={params.date_selector}
  //     />
  //   )
  // }

  requestDropoff = () => {
    // const { shop_id, addressDetail } = this.props;
    // const { _pick_up_date_time, _dropoffObj } = this.state;
    // const _pickupObj = this.props.navigation.getParam('_pickupObj', {});
    // console.log(_pickupObj, "_pickupObj in dropoff")
    // console.log(_dropoffObj, "_dropoffObj in dropoff")
    // console.log(addressDetail, "addressDetail")
    // let obj = {
    //   shop_id,
    //   pick_up_date_time: _pick_up_date_time,
    //   customer_id: "1",
    //   pick_up_time: _pickupObj.pick_up_range,
    //   drop_off_time: _dropoffObj.drop_off_range,
    //   start_pickup_time: _pickupObj.pick_up_time_from,
    //   end_pickup_time: _pickupObj.pick_up_time_to,
    //   start_drop_off_time: _dropoffObj.drop_off_time_from,
    //   end_drop_off_time: _dropoffObj.drop_off_time_to
    // }
    // console.log({ ...obj, ...addressDetail }, "requestDropoff")
    // this.props.placeOrderAction({ ...obj, ...addressDetail }, this.props.navigation).then(() => {
    //   this.props.navigation.navigate('Home')
    // })
    // const { obj, _pickupObj } = this.props;
    const { navigation } = this.props;
    const obj = navigation.getParam('obj', 'NO-ID');
    const _pickupObj = navigation.getParam('_pickupObjClone', 'some default value');
    console.log(obj, _pickupObj, "********")
    if (_pickupObj&&obj&&this.state._dropoffObj) {
      this.props.navigation.navigate('Services', { 
        data:{ obj, _pickupObj, _dropoffObj: this.state._dropoffObj }
      })
    }
    else {
      // alert("pick up required")
      this.props.error("drop off required", "err")
    }
  }
  componentWillMount() {
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
        <Text style={{ color: error[1] === "err" ? "red" : "yellow" }}>
          {error[0]}
        </Text>
      </View>
    )
  }
  render() {
    const { _loader, _timeSlots } = this.state;
    // const { obj, _pickupObj } = this.props;
    const { navigation } = this.props;
    const obj = navigation.getParam('obj', 'NO-ID');
    const _pickupObj = navigation.getParam('_pickupObjClone', 'some default value');
    const params = this.props.navigation.getParam('obj', {});
    console.log(obj, _pickupObj, "********", params)
    return (
      <AppContainer
        footerButton={true}
        hideBottomMask={true}
        footerButtonBack={true}
        // footerLink={this.state.userData?false:true} 
        header={true}
        navigation={this.props.navigation}
        title="Order"
        // data={{ obj, _pickupObj, _dropoffObj: this.state._dropoffObj }}
        func={this.requestDropoff}
        // route={"Services"}
      >
        <View style={{
          height: 100,
          paddingHorizontal: '10%'
        }}>
          <CustomText
            text="Drop Off"
            textSize={28}
            textWeight="bold"
            whiteTheme="#221765"
             />
          <CustomText
            text="Select Drop Off date and time"
            textSize={12}
            textWeight="bold"
            whiteTheme="#221765"
             />
          <View style={{ paddingTop: 20 }}>
            <CustomText
              text="Choose date of the pickup:"
              textSize={12}
              textWeight="bold" 
            whiteTheme="#221765"
            />
          </View>
        </View>
        <View style={{ height: screenHeight, paddingLeft: '3%' }}>
          <ScrollView horizontal={true}>
            {
              date.map((data, index) => {
                return (
                  <CustomHorizontalDatePicker
                    id={data.id}
                    key={data.id}
                    item={data}
                    onDateSelected={this.onDateSelected}
                    isSelected={data.id === this.state.selectedDateId}
                    that={this}
                    dateRange={params.date_selector}
                  />
                )
              })
            }
          </ScrollView>
          {/* <FlatList
            horizontal={true}
            data={date}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderDateItem}
          /> */}
          {/* <CustomHorizontalDatePicker /> */}
        </View>
        <View style={{ paddingHorizontal: '10%', marginTop: '4%' }}>
          <CustomText
            text="Choose your time slot:"
            textSize={12}
            textWeight="bold" 
            whiteTheme="#221765"
            />
        </View>
        <View style={{
          paddingHorizontal: '4%',
          marginTop: 15
        }}>
          {
            _loader ? <ActivityIndicator color="#eaa4c7" /> :
              (_timeSlots ?

                // <FlatList
                //   horizontal={true}
                //   data={_timeSlots}
                //   keyExtractor={this._keyExtractor}
                //   renderItem={this._renderItem}
                // /> 
                <ScrollView horizontal={true}>
                  {
                    _timeSlots.map((dateRange, index) => {
                      return (
                        <TimeComponent
                          id={dateRange.id}
                          key={Number(dateRange.id)}
                          item={dateRange}
                          onTimeSelected={this.onTimeSelected}
                          isSelected={dateRange.id === this.state.selectedRangeId}

                        />
                      )


                    })
                  }
                </ScrollView>

                : null)
            // _loader ? <ActivityIndicator color="#fff" /> : null
          }
          {/* {_timeSlots ?
            <FlatList
              horizontal={true}
              data={_timeSlots}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            /> :
            _loader ? <ActivityIndicator color="#fff" /> : null
          } */}
          {/* <TimePicker dateProps={_pickupDate} /> */}
          {(this.props.errorInStore) ? (
            this.err(this.props.errorInStore)
          ) : (null)}
        </View>
      </AppContainer>
    );
  }
}
let mapStateToProps = state => {
  return {
    shop_id: state.root.shop_id,
    addressDetail: state.root.addressDetail,
    errorInStore: state.root.error,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ requestTimeRange, placeOrderAction }, dispatch),
    ...bindActionCreators({ error }, dispatch),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dropoff);