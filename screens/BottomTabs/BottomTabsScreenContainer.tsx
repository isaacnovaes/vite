import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabsScreens } from '../../types/navigation';
import PresentationScreen from './PresentationScreen';
import VideoSharingScreen from './VideoSharingScreen';
import WhiteBoardScreen from './WhiteBoardScreen';

const BottomTabs = createBottomTabNavigator<BottomTabsScreens>();

const BottomTabsScreenContainer = () => {
    return (
        <BottomTabs.Navigator>
            <BottomTabs.Screen
                name='VideoSharing'
                component={VideoSharingScreen}
            />
            <BottomTabs.Screen name='WhiteBoard' component={WhiteBoardScreen} />
            <BottomTabs.Screen
                name='Presentation'
                component={PresentationScreen}
            />
        </BottomTabs.Navigator>
    );
};
export default BottomTabsScreenContainer;
