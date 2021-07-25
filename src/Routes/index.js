import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation';
import Signin from '../Screens/Signin';
import Signup from '../Screens/Signup';
import Welcome from '../Screens/Welcome';
import SplashScreen from '../Screens/SplashScreen';
import Subscription from '../Screens/Subscription';
import Home from '../Screens/Home';
import OrderHistory from '../Screens/OrderHistory';
import Privacy from '../Screens/Privacy&policy';
import ChangePassword from '../Screens/changePassword';
import Services from '../Screens/Services';
import AddressDetail from '../Screens/AddressDetail';
import Checkout from '../Screens/Checkout';
import Basket from '../Screens/Basket';
import PaymentDetails from '../Screens/PaymentDetails';
import OrderStatus from '../Screens/OrderStatus';
import Dropoff from '../Screens/Dropoff';
import Pickup from '../Screens/Pickup';
import Thanking from '../Screens/Thanking';
import HistoryDetails from '../Screens/HistoryDetails';
import Profile from '../Screens/Profile';

const StackNavigator = createStackNavigator({
  SplashScreen: { screen: SplashScreen },
  Pickup: { screen: Pickup },
  UserAccount: { screen: Profile },
  Dropoff: { screen: Dropoff },
  Signup: { screen: Signup },
  Basket: { screen: Basket },
  Thanking: { screen: Thanking },
  Welcome: { screen: Welcome },
  Subscription: { screen: Subscription },
  OrderStatus: { screen: OrderStatus },
  Services: { screen: Services },
  Checkout: { screen: Checkout },
  AddressDetail: { screen: AddressDetail },
  PaymentDetails: { screen: PaymentDetails },
  Home: { screen: Home },
  OrderHistory: { screen: OrderHistory },
  HistoryDetails: { screen: HistoryDetails },
  ChangePassword: { screen: ChangePassword },
  Privacy: { screen: Privacy },
  Signin: { screen: Signin },
}, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
      drawerLockMode: 'locked-closed'
    },
  });

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: StackNavigator
  },
},
  {
    drawerPosition: 'left',
    initialRouteName: 'Home',
    drawerWidth: 250,
    // drawerBackgroundColor: 'blue'
    // contentComponent: DrawerContent,
    // drawerLockMode: 'locked-open'
  }
)

const Navigation = createAppContainer(DrawerNavigator)

export default Navigation;