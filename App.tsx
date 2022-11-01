import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import InitialScreen from './screens/InitialScreen';
import {
    TutorialStepOneScreen,
    TutorialStepTwoScreen,
    TutorialStepThreeScreen,
    TutorialStepFourScreen,
} from './screens/TutorialScreens';
import { type StackScreens } from './types/navigation';
import LogInScreen from './screens/LogInScreen';
import SingUpScreen from './screens/SingUpScreen';
import CreateRoomScreen from './screens/CreateRoomScreen';
import BottomTabsScreenContainer from './screens/BottomTabs/BottomTabsScreenContainer';
import { colors } from './Constants/colors';
import { ContextProvider } from './context/ContextProvider';

const Stack = createNativeStackNavigator<StackScreens>();

const App = () => {
    return (
        <ContextProvider>
            <StatusBar barStyle={'light-content'} />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: colors.background },
                        headerTintColor: colors.green,
                        // headerTitleStyle: {}
                        contentStyle: {
                            backgroundColor: colors.background,
                        },
                        headerTitleAlign: 'center',
                        animation: 'fade',
                    }}
                >
                    <Stack.Screen
                        name='Initial'
                        component={InitialScreen}
                        options={{
                            title: 'Welcome',
                            headerTitleAlign: 'center',
                        }}
                    />
                    <Stack.Screen
                        name='TutorialStepOne'
                        component={TutorialStepOneScreen}
                        options={{
                            title: 'Tutorial Step 1',
                            presentation: 'modal',
                            animation: 'slide_from_bottom',
                        }}
                    />
                    <Stack.Screen
                        name='TutorialStepTwo'
                        component={TutorialStepTwoScreen}
                        options={{
                            title: 'Tutorial Step 2',
                            presentation: 'modal',
                            animation: 'slide_from_bottom',
                        }}
                    />
                    <Stack.Screen
                        name='TutorialStepThree'
                        component={TutorialStepThreeScreen}
                        options={{
                            title: 'Tutorial Step 3',
                            presentation: 'modal',
                            animation: 'slide_from_bottom',
                        }}
                    />
                    <Stack.Screen
                        name='TutorialStepFour'
                        component={TutorialStepFourScreen}
                        options={{
                            title: 'Tutorial Step 4',
                            presentation: 'modal',
                            animation: 'slide_from_bottom',
                        }}
                    />
                    <Stack.Screen
                        name='Login'
                        component={LogInScreen}
                        options={{ title: 'Log in' }}
                    />
                    <Stack.Screen
                        name='SignUp'
                        component={SingUpScreen}
                        options={{ title: 'Sign up' }}
                    />

                    <Stack.Screen
                        name='CreateRoom'
                        component={CreateRoomScreen}
                        options={{
                            title: 'Create Room',
                            headerBackVisible: false,
                        }}
                    />
                    <Stack.Screen
                        name='BottomTabs'
                        component={BottomTabsScreenContainer}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ContextProvider>
    );
};

export default App;
