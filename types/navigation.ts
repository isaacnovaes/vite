import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Native Stack
export type StackScreens = {
    Initial: undefined;
    TutorialStepOne: undefined;
    TutorialStepTwo: undefined;
    TutorialStepThree: undefined;
    TutorialStepFour: undefined;
    Login: undefined;
    SignUp: undefined;
    CreateRoom: undefined;
    BottomTabs: undefined;
};

export type StackScreenInitialProps = NativeStackScreenProps<
    StackScreens,
    'Initial'
>;

export type StackScreenTutorialStepOneProps = NativeStackScreenProps<
    StackScreens,
    'TutorialStepOne'
>;

export type StackScreenTutorialStepTwoProps = NativeStackScreenProps<
    StackScreens,
    'TutorialStepTwo'
>;

export type StackScreenTutorialStepThreeProps = NativeStackScreenProps<
    StackScreens,
    'TutorialStepThree'
>;

export type StackScreenTutorialStepFourProps = NativeStackScreenProps<
    StackScreens,
    'TutorialStepFour'
>;

export type StackScreenLoginProps = NativeStackScreenProps<
    StackScreens,
    'Login'
>;

export type StackScreenSignUpProps = NativeStackScreenProps<
    StackScreens,
    'SignUp'
>;

export type StackScreenCreateRoomProps = NativeStackScreenProps<
    StackScreens,
    'CreateRoom'
>;

// Only a Screens Container
export type StackScreenBottomTabsProps = NativeStackScreenProps<
    StackScreens,
    'BottomTabs'
>;

// Bottom Tabs
export type BottomTabsScreens = {
    VideoSharing: undefined;
    WhiteBoard: undefined;
    Presentation: undefined;
};

export type BottomTabVideoSharingProps = CompositeScreenProps<
    BottomTabScreenProps<BottomTabsScreens, 'VideoSharing'>,
    NativeStackScreenProps<StackScreens>
>;

export type BottomTabWhiteBoardProps = CompositeScreenProps<
    BottomTabScreenProps<BottomTabsScreens, 'WhiteBoard'>,
    NativeStackScreenProps<StackScreens>
>;

// export type BottomTabAllExpensesItemListNavHook =
//     BottomTabAllExpensesProps['navigation'];

export type BottomTabPresentationProps = CompositeScreenProps<
    BottomTabScreenProps<BottomTabsScreens, 'Presentation'>,
    NativeStackScreenProps<StackScreens>
>;
