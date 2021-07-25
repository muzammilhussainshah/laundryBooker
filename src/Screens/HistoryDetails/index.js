import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TextInput, ScrollView } from 'react-native';
import CircularBox from '../../Components/CircularBox/CircularBox'
import DetailBox from '../../Components/DetailBox'
import BasicList from '../../Components/BasicList'
import AppContainer from '../../Containers/AppContainer';
import CustomText from "../../Components/CustomText";


class HistoryDetails extends Component {
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
  componentWillMount() {
    console.log(this.props.navigation.getParam('data'), 'history dataaa')
  }

  detail = (heading, info) => {
    return (
      <View style={{ flexDirection: 'row' , marginTop : 3 }}>
        <View style={{ flex: 2 }}>
          <CustomText textWeight={"bold"} text={heading} />
        </View>
        <View style={{ flex: 3 }}>
          <CustomText text={info? info: ''} />
        </View>
      </View>
    )
  }
  render() {
    let historyData = this.props.navigation.getParam('data')
    return (
      <AppContainer hideBottomMask={true} footer={true} header={true} title="Order History"
        footerButton={false} route="Welcome" >
        <View style={styles.container}>
        <View style = {{marginVertical : 12}}>
          <CustomText text={"#Laundry " + historyData.id}
            textSize={20}
            textWeight={"bold"}
          />
          </View>
          {/* {this.detail('Created at', historyData.created_at)} */}
          {this.detail('Pick Up', historyData.start_pickup_time)}
          {this.detail('Drop Off', historyData.start_drop_off_time)}
          {this.detail('Status', historyData.order_status)}
          {this.detail('Shop ID', historyData.shop_id)}
          {this.detail('Postal Code', historyData.postal_code)}
          {this.detail('House Number', historyData.house_number)}
          {this.detail('Street', historyData.street)}
          {this.detail('Town', historyData.town)}
          {this.detail('Price', historyData.total)}

          {
            historyData.order_details.map((orders,index)=>{
              console.log(orders,'orders87888')
              console.log(orders['cat_name'])

              return(
                <View key={index} style={{padding: 20}}>
                    {this.detail('Category', orders['cat_name'])}
                    {this.detail('Service',  orders['service_name'])}
                    {this.detail('Service Price', orders['service_price'])}
                    {this.detail('service Quantity', orders['service_quantity'])}

                </View>
              )
            })
          }
          
        </View>
      </AppContainer>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    marginTop: 16,
    height: 40,
    borderColor: '#fff',
    borderWidth: 0.4,
    justifyContent: 'center',
    color: "#fff",
    width: "80%"
  },
  container: {
    marginHorizontal: 15,
    backgroundColor: "#4C44AF",
    borderRadius: 12,
    justifyContent: "center",
    flex: 1,
    marginTop: 7.5,
    marginBottom: 7.5,
    padding: 15
  },
});

export default HistoryDetails; 