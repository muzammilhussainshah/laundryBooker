import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Platform } from 'react-native';
//component
import CustomText from "../../Components/CustomText";
import RenderList from "../../Components/RenderList";
import services from "../../Screens/Services/index";

const url = `http://laundary.debughands.com/api/get-categories`

class ServicesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesData: [],
      orderArr: []
    }
  }

  componentWillMount() {
    fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      return res.json()
    }).then(response => {
      console.log(response, "222response from backend")
      this.setState({ categoriesData: response.results.results })
    })
  }

  _keyExtractor = (item, index) => JSON.stringify(item.id);

  quantity(serviceDataSelected) {
    console.log(serviceDataSelected, "quantityquantityquantityquantity")
    orderArrClone = this.state.orderArr;
    if (serviceDataSelected.quantity > 0) {
      orderArrClone[serviceDataSelected.name] = serviceDataSelected
    }
    else {
      delete orderArrClone[serviceDataSelected.name];
    }
    console.log(orderArrClone, "orderArrorderArrorderArr");
    this.setState({ orderArr: orderArrClone }, () => {
      this.props.func(this.state.orderArr)
    })

    // if (serviceDataSelected.quantity !== 0) {

    // }
    // else if (serviceDataSelected.quantity === 0) {

    // }


    // let quantityClon = quantity
    // quantityClon.priceNDetails = serviceDataSelected
    // quantityClon.service_id = this.state.service_id
    // console.log("last final obj", quantityClon)
    // // services("bablu")

  }
  render() {
    const { categoriesData } = this.state;
    return (
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <View style={styles.textContainer}>
          <CustomText
            text="Choose services you need from the list below."
            textSize={20}
            whiteTheme="#221765"
            textWeight="bold"
          />
        </View>
        <View style={{ paddingBottom: 9 }}>
          {
            categoriesData.length > 0 ?
              <FlatList
                data={categoriesData ? categoriesData : []}
                keyExtractor={this._keyExtractor}
                renderItem={({ item, index }) => <RenderList func={(serviceDataSelected) => this.quantity(serviceDataSelected)} data={item} key={JSON.stringify(item.id)} />}
              /> :
              <ActivityIndicator size={Platform.android ? 30 : 1} style={{ marginTop: 100 }} color="#eaa4c7" />
          }
        </View>
      </View >
    );
  }
}
const styles = StyleSheet.create({
  textContainer: {
    paddingTop: 10,
    paddingBottom: 5
  }
})
export default ServicesContainer;