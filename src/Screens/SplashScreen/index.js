import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { centerMaskStyle } from './styles'
// Assets
import centerMask from '../../../assets/Masks/centerMask.png'
import AppContainer from '../../Containers/AppContainer';
import CustomText from '../../Components/CustomText'
import { withNavigation } from 'react-navigation';

const _retrieveData = async (navigation) => {
  try {
    const value = await AsyncStorage.getItem('authToken');
    if (value !== null) {
      // We have data!!
      console.log(value);
      navigation.navigate('Home')
    }
    else {
      navigation.navigate('Welcome')
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    _retrieveData(navigation)
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AppContainer footer={false} />
      <View style={centerMaskStyle}>
        <View style={{ flexDirection: "row", zIndex: 1000 }}>
          <Image
            source={centerMask}
            style={{ height: 125, width: 125 }} />
        </View>
        <View style={{ paddingTop: '6%' }}>
          <CustomText
            textSize={36}
            text="LaundryTech"
            textWeight='bold'
          />
        </View>
        <View
          style={{
            paddingTop: 10,
            alignItems: 'center'
          }}
        >
          <CustomText
            textSize={13}
            text={`Let us take care of your laundry,\n so you can take care of you`}
            textWeight='bold'
            align="center"
          />
        </View>
      </View>
    </View>
  );

}

export default withNavigation(SplashScreen);