import React ,  { useState , useEffect , useRef} from 'react';
import * as Notifications from "expo-notifications"
import {Platform} from "react-native"
import * as Device from "expo-device"
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Home from './Screens/UserPage';
import Detail from './Screens/Detail';
import SplashScreen from './Screens/SplashScreen';
import Login from './Screens/Login';
import AdminPage from './Screens/AdminPage';
import About from './Screens/About';
import Settings from './Screens/Setting';
import Register from './Screens/Register';
import Help from './Screens/Help';
import AdminAddMenu from './Screens/AdminAddMenu';
import Menu from './Screens/Menu';
import SaleAdminPage from './Screens/SaleAdminPage';
import OrderAdminPage from './Screens/OrderAdminPage';
import UserPage from './Screens/UserPage';
import AdminUserListPage from './Screens/AdminUserListPage';
import AdminUserEditPage from './Screens/AdminUserPageEdit';
import ShoppingCartScreen from './Screens/ShoppingCart';
import Checkout from './Screens/Checkout';
import CheckoutFinal from './Screens/CheckoutFinal';
import ProductDetail from './Screens/ProductDetail';
import CheckoutOrder from './Screens/CheckoutOrder';
import OrderHistory from './Screens/OrderHistory';
import CollectPoints from './Screens/CollectPoints';
import EditProfile from './Screens/EditProfile';
const Stack = createStackNavigator()

const Tab = createBottomTabNavigator();

const FontSizeContext = React.createContext();

const HomeTabs = () => (
  
  <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                  iconName = 'home';
              } else if (route.name === 'About') {
                  iconName = 'info-circle';
              } else if (route.name === 'Settings') {
                  iconName = 'cogs';
              }else if (route.name === 'Help') {
                iconName = 'help';
            }

              // You can return any component that you like here!
              return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
      })}
  >
      <Tab.Screen name="Home" component={Home}  />
      <Tab.Screen name="About" component={About} options={{ headerShown: false }} />
      <Tab.Screen name="Help" component={Help} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={Settings}  options={{ headerShown: false }} />
  </Tab.Navigator>
);
export default function App() {
  const [globalFontSize, setGlobalFontSize] = useState(16);
  return (
    <FontSizeContext.Provider value={{ globalFontSize, setGlobalFontSize }}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AdminPage"  component={AdminPage} options={{ headerShown: false }} />
                <Stack.Screen name="ShoppingCart"  component={ShoppingCartScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Checkout"  component={Checkout} options={{ headerShown: false }} />
                <Stack.Screen name="CheckoutOrder"  component={CheckoutOrder} options={{ headerShown: false }} />
                <Stack.Screen name="CheckoutFinal"  component={CheckoutFinal} options={{ headerShown: false }} />
                <Stack.Screen name="UserPage"  component={UserPage} options={{ headerShown: false }} />
                <Stack.Screen name="ProductDetail"  component={ProductDetail} options={{ headerShown: false }} />
                <Stack.Screen name="AdminUserListPage"  component={AdminUserListPage} options={{ headerShown: false }} />
                <Stack.Screen name="AdminEditUserPage"  component={AdminUserEditPage} options={{ headerShown: false }} />
                <Stack.Screen name="AdminAddMenu"  component={AdminAddMenu} options={{ headerShown: false }} />
                <Stack.Screen name="Menu"  component={Menu} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
                <Stack.Screen name="Detail" component={Detail} />
                <Stack.Screen name="SaleAdmin" component={SaleAdminPage} options={{ headerShown: false }} />
                <Stack.Screen name="OrderAdmin" component={OrderAdminPage} options={{ headerShown: false }} />
                <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ headerShown: false }} />
                <Stack.Screen name="CollectPoints" component={CollectPoints} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </FontSizeContext.Provider>
  );
}
export { FontSizeContext };

