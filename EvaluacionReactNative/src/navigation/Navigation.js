import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "../screens/Home"
import Add from "../screens/Add"

export default function Navigation(){
    const stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false}}>

                <stack.Screen name="Home" component={Home}/>
                <stack.Screen name="Add" component={Add}/>
                
            </stack.Navigator>
        </NavigationContainer>
    );
}