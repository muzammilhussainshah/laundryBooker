import React from 'react';
// Container
import AppContainer from '../../Containers/AppContainer';
//component
import BasketContainer from "../../Containers/BasketContainer";

const Basket = (props) => {
  const data = props.navigation.getParam('data', 'NO-ID');

  console.log(data,"datadatassdata")
  return (
    <AppContainer
      hideBottomMask={true}
      footer={true}
      footerButton={true}
      header={true}
      title="Your Basket"
      data={data}
      route="PaymentDetails"
      Basket={true}
    >
      <BasketContainer  data={data} navigation={props.navigation}/>
    </AppContainer>
  );
}

export default Basket;