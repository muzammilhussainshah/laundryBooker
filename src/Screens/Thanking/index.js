import React from 'react';
import { View } from 'react-native';
// styles
const appInput = { width: '100%', marginTop: '10%' }
// Container
import AppContainer from '../../Containers/AppContainer';
//component
import CircularBox from '../../Components/CircularBox/CircularBox';
import CustomText from '../../Components/CustomText'

const Thanking = () => {
  return (
    <AppContainer hideBottomMask={true} footerLink={true} >
      <View style={{ width: '100%', marginTop: '30%' }}>
        <CircularBox
          height={190}
          mainDivHeight={400}
          formBtn={true}
          route="Home"
        >
          <View style={appInput}>
            <CustomText
              text="Thank you"
              textSize={20}
              textWeight="bold"
              align='center'
            />
            <CustomText
              text={`We will send you an e-mail / sms to:\n*****************\nwhen we are around your area.`}
              textSize={16}
              textWeight="bold"
              align='center'
            />
          </View>

        </CircularBox>
      </View>
    </AppContainer >
  );
}

export default Thanking;