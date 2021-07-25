import React from 'react';
import { View, ScrollView } from 'react-native';
// styles
// Container
import AppContainer from '../../Containers/AppContainer';
//component
import Greeting from "../../Components/Greeting";
import Gridmenu from "../../Components/Gridmenu";
import { connect } from 'react-redux';
import { storeUserInfo } from '../../Store/Action/authAction'
import lifecycle from 'react-pure-lifecycle';

const methods = {
  componentDidMount(props) {
    props.storeUserInfo();
  }
};

const Home = (props) => {
  return (
    // <View style={{ flex: 1 }}>
    <AppContainer hideBottomMask={true} footer={true} header={true} title="HOME" 
    // footerText={true}
     footerButton={false} route="Welcome" >
      {/* <View style={{flex:5}}> */}
      <Greeting heading="Hello!" subheading="Laundry washed and tumble dried." />
      <Gridmenu />
      {/* </View> */}
    </AppContainer>

    // </View >
  );
}

// export default Home;



const mapDispatchToProps = dispatch => {
  return {
    storeUserInfo: () => {
      dispatch(storeUserInfo())
    }
  }
}

export default connect(null, mapDispatchToProps)(lifecycle(methods)(Home));