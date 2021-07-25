import React  , {useEffect , useState} from 'react';
// Container
import AppContainer from '../../Containers/AppContainer';
//component
import AddressContainer from "../../Containers/AddressContainer";
import AsyncStorage from '@react-native-community/async-storage';

const AddressDetail =   () => {
  const [dataAvailabe,setdataAvailabe]= useState(true)
  useEffect(()=>{
    AsyncStorage.getItem('authToken').then((value)=>{
      if(value != null){
        setdataAvailabe(false) 
      }else{
        setdataAvailabe(true) 
      }
    });
  },[])
console.log(dataAvailabe  , 'dataAvailabe')
  return (
    <AppContainer
      hideBottomMask={true}
      footerLink={dataAvailabe}
      header={true}
    >
      <AddressContainer />
    </AppContainer>
  );
}

export default AddressDetail;