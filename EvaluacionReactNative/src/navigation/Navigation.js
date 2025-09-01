import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function Navigation(){
    const stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <stack.Navigator initialRouteName='' screenOptions={{ headerShown: false}}>

                <stack.Screen name="" component={ejemplo}/>
                
            </stack.Navigator>
        </NavigationContainer>
    );
}