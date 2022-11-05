/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../Constants/colors';
import {
    FocusedVideoSharingTabIcon,
    VideoSharingTabIcon,
    FocusedWhiteboardTabIcon,
    WhiteBoardTabIcon,
    FocusedPresentationTabIcon,
    PresentationTabIcon,
} from '../../icons/icons';
import { BottomTabsScreens } from '../../types/navigation';
import PresentationScreen from './PresentationScreen';
import VideoSharingScreen from './VideoSharingScreen';
import WhiteBoardScreen from './WhiteBoardScreen';

const BottomTabs = createBottomTabNavigator<BottomTabsScreens>();

const BottomTabsScreenContainer = () => {
    return (
        <BottomTabs.Navigator
            initialRouteName='VideoSharing'
            sceneContainerStyle={{ backgroundColor: colors.foreground }}
            screenOptions={({ route }) => ({
                headerStyle: { backgroundColor: colors.background },
                headerTintColor: colors.green,
                headerTitleAlign: 'center',
                tabBarActiveTintColor: colors.green,
                tabBarInactiveTintColor: colors.white,
                tabBarStyle: { backgroundColor: colors.background },
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'VideoSharing') {
                        if (focused) {
                            return <FocusedVideoSharingTabIcon />;
                        } else {
                            return <VideoSharingTabIcon />;
                        }
                    }

                    if (route.name === 'WhiteBoard') {
                        if (focused) {
                            return <FocusedWhiteboardTabIcon />;
                        } else {
                            return <WhiteBoardTabIcon />;
                        }
                    }

                    if (route.name === 'Presentation') {
                        if (focused) {
                            return <FocusedPresentationTabIcon />;
                        } else {
                            return <PresentationTabIcon />;
                        }
                    }
                },
            })}
        >
            <BottomTabs.Screen
                name='Presentation'
                component={PresentationScreen}
                options={{ title: 'Presentation' }}
            />
            <BottomTabs.Screen
                name='VideoSharing'
                component={VideoSharingScreen}
                options={{ title: 'Video Sharing' }}
            />
            <BottomTabs.Screen name='WhiteBoard' component={WhiteBoardScreen} />
        </BottomTabs.Navigator>
    );
};
export default BottomTabsScreenContainer;
