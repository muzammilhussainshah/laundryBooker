import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TextInput,ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import CircularBox from '../../Components/CircularBox/CircularBox'
import CustomText from '../../Components/CustomText'
import DetailBox from '../../Components/DetailBox'
import BasicList from '../../Components/BasicList'
import AppInput from '../../Components/TextInput'
import { data } from './data'
import Moment from 'moment';


class BasketContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _houseNum: '',
      _street: '',
      _town: '',
      _postCode: '',
      itemsInBasket: []
    }
  }
  componentWillMount(){
    let arr = []
   for(var key in this.props.data.orderArr){
     console.log(key,this.props.data.orderArr[key],"****")
     arr.push(this.props.data.orderArr[key])
   }
   this.setState({
     itemsInBasket:arr
   })
  }
  render() {
    let pickDateTh=Number(this.props.data._pickupObj.pick_up_time_from[8]+this.props.data._pickupObj.pick_up_time_from[9])
    let dropDateTh=Number(this.props.data._dropoffObj.drop_off_time_from[8]+this.props.data._dropoffObj.drop_off_time_from[9])
    const { _houseNum, _street, _town, _postCode } = this.state
    console.log(Number(pickDateTh),"navigationnavigationnavigationnavigationnavigationnavigation",this.state.itemsInBasket)
    return (
      <ScrollView style={{}}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
          </MapView>
        </View>
        <CircularBox
          height={120}
          mainDivHeight={140}
          hideLoader={true}
        >
          <DetailBox heading="Address" data={this.props.data} navigation={this.props.navigation} content1={`${this.props.data.details._address}\n${this.props.data.details._street}\n${this.props.data.details._town}`} contentSize={12} />
        </CircularBox>
        <CircularBox
          height={120}
          mainDivHeight={140}
          hideLoader={true}
        >
          <DetailBox hideEdit={true} heading="Collection" content1={pickDateTh+((pickDateTh===1)?("st"):pickDateTh===2?"nd":pickDateTh===3?"rd":pickDateTh>3?"th":"")} content2={this.props.data._pickupObj.pick_up_range} contentSize={20} />
        </CircularBox>
        <CircularBox
          height={120}
          mainDivHeight={140}
          hideLoader={true}

        >
          <DetailBox hideEdit={true} heading="Drop Off" content1={dropDateTh+((dropDateTh===1)?("st"):dropDateTh===2?"nd":dropDateTh===3?"rd":dropDateTh>3?"th":"")} content2={this.props.data._dropoffObj.drop_off_range} contentSize={20} />
        </CircularBox>
        {/* <CircularBox
          height={380}
          mainDivHeight={400}
          hideLoader={true}

        > */}
          {/* <CustomText text="Your Items" textWeight="bold" /> */}
          <View style={{ width: '80%',marginHorizontal:"10%" }}>
            <FlatList
              data={this.state.itemsInBasket}
              renderItem={({ item, index }) => <BasicList data={item} key={index} basket={true} />}
            />
          </View>
        {/* </CircularBox> */}
        {/* <CircularBox
          height={120}
          mainDivHeight={140}
          hideLoader={true}

        > */}

          {/* <CustomText text="Enter Voucher Code" textWeight="bold" /> */}
          {/* <AppInput label="" /> */}
          {/* <TextInput
            style={styles.input} */}
          {/* // onChangeText={onChange}
          // value={value}
          /> */}
        {/* </CircularBox> */}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
    width: '80%',
    marginHorizontal: '10%',
    marginTop: '5%',
    marginBottom: '5%',
    position: 'relative', borderRadius: 12
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  input: {
 marginTop:16,
    height: 40,
    borderColor: '#fff',
    borderWidth: 0.4,
    justifyContent: 'center',
    color: "#fff",
    width:"80%"
  }
});

export default BasketContainer; 