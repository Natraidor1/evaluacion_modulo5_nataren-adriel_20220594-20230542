import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "../screens/Home"
import Add from "../screens/Add"
import LoginScreen from '../screens/LoginScreen';

export default function Navigation(){
    const stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false}}>

                <stack.Screen name="Home" component={Home}/>
                <stack.Screen name="Add" component={Add}/>
                <stack.Screen name="Login" component={LoginScreen}/>
                
            </stack.Navigator>
        </NavigationContainer>
    );
}