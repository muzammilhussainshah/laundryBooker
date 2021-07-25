import React from 'react';
import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import CircularBox from '../../Components/CircularBox/CircularBox'
import { withNavigation } from 'react-navigation'
// // Assets
import topMask from '../../../assets/Masks/topMask.png'
import bottomMask from '../../../assets/Masks/bottomMask.png'
// //components
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { FooterButton } from "../../Components/FooterButton";

const footerLinkFunc = (footerLink, signin, signup, footer, navigation, footerText,afterRout) => {
  // console.log(footerText, "footertext")
  if (footerLink && !signin && !signup) {
    return (<View style={styles.footerlinkStyle}>
      <Text style={styles.labelStyle}>For better experience. </Text>
      <Text style={styles.labelStyle} onPress={() => navigation.navigate('Signin')}>Sign In</Text>
      <Text style={styles.labelStyle}> / </Text>
      {afterRout?(
      <Text style={styles.labelStyle} onPress={() => navigation.navigate('Signup',{afterRout})}>Sign Up</Text>
      )
      :(
      <Text style={styles.labelStyle} onPress={() => navigation.navigate('Signup',)}>Sign Up</Text>
      )}
    </View>)
  }
  else if (signin || signup) {
    return (
      signin ?
        <TouchableOpacity style={styles.footerlinkStyle} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.labelStyle}>Don't have an account? </Text>
          <Text style={styles.labelStyle} >Sign Up.</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.footerlinkStyle} onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.labelStyle}>Already have an account? </Text>
          <Text style={styles.labelStyle}>Sign In.</Text>
        </TouchableOpacity>
    )
  } else if (footer) {
    return (
      <Footer footerText={footerText} />
    )
  }
}


const AppContainer = ({ footerText, hideBottomMask, navigation, footerLink, signin, signup, header, footer, title, children, maskHeight, maskWidth, footerButton, route, func,price,data,afterRout,footerButtonBack ,Basket}) => {
  console.log(route, "fooatertext44",data,navigation)
  return (
    <View style={styles.container}>
      <Image
        source={topMask}
        style={[styles.topMaskStyle,
        (maskHeight && maskWidth) ?
          { height: maskHeight, width: maskWidth } : {}
        ]} />
      <View style={styles.headerContainer}>
        {header ?
          <Header title={title ? title : ""} /> : null}
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView>
          {children ? children : null}
        </ScrollView>
      </View>
      {hideBottomMask ? null : <Image source={bottomMask} style={styles.bottomMaskStyle} />}
      <View style={footerLink ? styles.footerContainerLink : styles.footerContainer}>
        {footerLinkFunc(footerLink, signin, signup, footer, navigation, footerText,afterRout)}
      </View>
      {footerButton ?
        <View style={styles.footerBtnStyle}>
          <FooterButton navigate={navigation.navigate} route={route} Basket={Basket}
           func={func} data={data} goBack={footerButtonBack?navigation.goBack:null}  />
        </View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'space-between', flex: 1,
  //  backgroundColor: '#221765'

},
  topMaskStyle: { position: 'absolute', top: 0, left: 0, height: '40%', width: '85%' },
  headerContainer: { flex: 0.5, justifyContent: 'flex-start', paddingTop: '10%' },
  bodyContainer: { flex: 7, zIndex: 1000 },
  footerContainerLink: { flex: 0.5, justifyContent: 'center', backgroundColor: 'transparent', zIndex: 1000, alignItems: 'center' },
  footerContainer: { flex: 0.91, justifyContent: 'flex-end', backgroundColor: 'transparent' },
  footerlinkStyle: { flexDirection: 'row' },
  labelStyle: { fontWeight: 'bold', fontSize: 16, color: '#221765', paddingBottom: 5 },
  bottomMaskStyle: { position: 'absolute', bottom: 0, right: 0, height: '35%', width: '70%' },
  footerBtnStyle: {
    position: 'absolute',
    bottom: '2%',
    right: '2%',
    zIndex: 1000
  }
})

export default withNavigation(AppContainer);