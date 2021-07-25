import React, { Component } from "react";
import {
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Text
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AppContainer from "../../Containers/AppContainer";
import CustomHorizontalDatePicker from "../../Components/HorizontalDatePicker";
import TimeComponent from "../../Components/TimeComponent";
import CustomText from "../../Components/CustomText";
import { requestTimeRange, error } from "../../Store/Action/requestAction";
import { data, date } from "../../Components/TimePicker/data";
const screenHeight = Dimensions.get("window").height * 0.27;
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";

class Pickup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _dropoffDate: "",
      _timeSlots: null,
      _loader: false,
      _pick_up_date_time: "",
      _pickupObj: null,
      selectedDateId: "",
      selectedRangeId: ""
    };
  }

  onDateSelected = date => {
    const { shop_id } = this.props;
    console.log("Selected Date:==>", date, new Date(date));

    var dropOffDates = new Date();
    dropOffDates.setDate(dropOffDates.getDate() + 5);

    let month = new Date(dropOffDates).getMonth() + 1;
    let day = new Date(dropOffDates).getDate();
    let year = new Date(dropOffDates).getFullYear();

    let dateToSent = `${year}/${month > 12 ? 1 : month}/${day}`;
    console.log(dateToSent, "=>dateToSent", month, day, year);
    this.setState({ _dropoffDate: dateToSent, _loader: true });
    let obj = {
      shop_id,
      date
    };
    console.log(obj, "*4*444");
    this.props.requestTimeRange(obj, "get-pick-up").then(data => {
      this.setState({
        _timeSlots: data,
        _loader: false,
        _pick_up_date_time: "",
        _pickupObj: null
      });
    });
  };

  onTimeSelected = (time, item) => {
    console.log(time, "time33333333");
    this.setState({
      _pick_up_date_time: time,
      _pickupObj: item,
      selectedRangeId: item.id
    });
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <TimeComponent
      id={item.id}
      key={Number(item.id)}
      item={item}
      onTimeSelected={this.onTimeSelected}
    />
  );
  // _renderDateItem = ({ item }) => (
  //   <CustomHorizontalDatePicker
  //     id={item.id}
  //     key={item.id}
  //     item={item}
  //     onDateSelected={this.onDateSelected} />
  // )

  requestPickup = () => {
    const { shop_id } = this.props;
    const { _dropoffDate, _pick_up_date_time, _pickupObj } = this.state;
    const _postcode = this.props.navigation.getParam("_postcode", "NO-ID");
    console.log(_postcode, "_postcode");
    let obj = {
      shop_id,
      pick_up_date_time: _pick_up_date_time,
      date_selector: _dropoffDate
    };
    let _pickupObjClone = _pickupObj;
    if (_pickupObjClone) {
      _pickupObjClone._postcode = _postcode;
      this.props.navigation.navigate("Dropoff", { obj, _pickupObjClone });
    } else {
      // alert("pick up required")
      this.props.error("pick up required", "err");
    }
    console.log(obj, "requestPickusssssp", _pickupObjClone);
  };
  componentWillMount() {
    this._retrieveData();
  }
  _retrieveData = async () => {
    console.log("userData");
    try {
      const userData = await AsyncStorage.getItem("authToken");
      console.log(userData, "****userData***");
      this.setState({
        userData
      });
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
    );
  }
  render() {
    const { _loader, _timeSlots } = this.state;
    return (
      <AppContainer
        footerButton={true}
        footerButtonBack={true}
        hideBottomMask={true}
        // footerLink={this.state.userData?false:true}
        header={true}
        title="Order"
        func={this.requestPickup}
      >
        <View
          style={{
            height: 100,
            paddingHorizontal: "10%"
          }}
        >
          <CustomText
            text="Pick Up"
            textSize={28}
            textWeight="bold"
            whiteTheme="#221765"
          />
          <CustomText
            text="Select Pickup date and time"
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
        <View style={{ height: screenHeight, paddingLeft: "3%" }}>
          {/* <FlatList
            horizontal={true}
            data={date}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderDateItem}
          /> */}

          <ScrollView horizontal={true}>
            {date.map((data, index) => {
              return (
                <CustomHorizontalDatePicker
                  id={data.id}
                  key={data.id}
                  item={data}
                  isSelected={data.id === this.state.selectedDateId}
                  that={this}
                  onDateSelected={this.onDateSelected}
                />
              );
            })}
          </ScrollView>

          {/* <CustomHorizontalDatePicker /> */}
        </View>
        <View style={{ paddingHorizontal: "10%", marginTop: "4%" }}>
          <CustomText
            text="Choose your time slot:"
            textSize={12}
            textWeight="bold"
            whiteTheme="#221765"
          />
        </View>
        <View
          style={{
            paddingHorizontal: "4%",
            marginTop: 15
          }}
        >
          {_loader ? (
            <ActivityIndicator color="#eaa4c7" />
          ) : _timeSlots ? (
            // <FlatList
            //   horizontal={true}
            //   data={_timeSlots}
            //   keyExtractor={this._keyExtractor}
            //   renderItem={this._renderItem}
            // />
            <ScrollView horizontal={true}>
              {_timeSlots.map((dateRange, index) => {
                return (
                  <TimeComponent
                    id={dateRange.id}
                    key={Number(dateRange.id)}
                    item={dateRange}
                    onTimeSelected={this.onTimeSelected}
                    isSelected={dateRange.id === this.state.selectedRangeId}
                  />
                );
              })}
            </ScrollView>
          ) : null
          // _loader ? <ActivityIndicator color="#fff" /> : null
          }
          {/* <TimePicker dateProps={_dropoffDate} /> */}
          {this.props.errorInStore ? this.err(this.props.errorInStore) : null}
        </View>
      </AppContainer>
    );
  }
}

let mapStateToProps = state => {
  return {
    shop_id: state.root.shop_id,
    errorInStore: state.root.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ requestTimeRange }, dispatch),
    ...bindActionCreators({ error }, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pickup);
