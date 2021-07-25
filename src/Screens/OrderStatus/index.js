import React from 'react';
import { View } from "react-native";
import { withNavigation } from "react-navigation";
// Container
import AppContainer from '../../Containers/AppContainer';
import CustomText from '../../Components/CustomText';
//component
const OrderStatus = ({navigation}) => {
  const flag = navigation.getParam('active');
  return (
    <AppContainer
      hideBottomMask={false}
      header={true}
      title="ORDER STATUS"
      footerButton={true}
      footerText={false}
      route="Home"
    >
    {flag != true ?
      <View style={{alignItems:'center',width:'100%',paddingHorizontal:'10%',marginTop:'50%'}}>
        <CustomText
          text="Thank You"
          textSize={20}
          whiteTheme={"#221765"}
          textWeight="bold"
        />
        <CustomText
          text="Order completed, we send you email or text with
          confirmation code"
          textSize={16}
          whiteTheme={"#221765"}

          align="center"
          textWeight="bold"
          paddingVertical={15}
          />
        <CustomText
          text={`If you have account you can also check your\norder active status in the menu.`}
          whiteTheme={"#221765"}
          textSize={16}
          align="center"
          textWeight="bold"
        />
      </View>:
     <View style={{alignItems:'center',width:'100%',paddingHorizontal:'10%',marginTop:'50%'}}>
     <CustomText
       text="You haven’t placed any orders yet"
       textSize={20}
       textWeight="bold"
       align="center"
     />
     <CustomText
       text={`Check this page to track the status\nof you current order.`}
       textSize={11}
       align="center"
       textWeight="bold"
       paddingVertical={15}
       />
   </View>}
    </AppContainer>
  );
}

export default withNavigation(OrderStatus);