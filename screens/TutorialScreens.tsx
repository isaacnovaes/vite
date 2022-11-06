import { View, StyleSheet } from 'react-native';
import TutorialCard from '../components/UI/TutorialCard';
import {
    VideoIcon,
    WhiteboardIcon,
    PresentationIcon,
    ViteLogo,
} from '../icons/icons';
import GeneralScreenContainer from '../components/GeneralScreenContainer';
import {
    StackScreenTutorialStepOneProps,
    StackScreenTutorialStepTwoProps,
    StackScreenTutorialStepThreeProps,
    StackScreenTutorialStepFourProps,
} from '../types/navigation';

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
});

export const TutorialStepOneScreen = (
    props: StackScreenTutorialStepOneProps
) => {
    return (
        <GeneralScreenContainer>
            <View style={styles.container}>
                <TutorialCard
                    iconComponent={<ViteLogo />}
                    heading='Vite'
                    text='Vite makes online lectures more collaborative and immersive. Share your camera, draw on whiteboard and share your presentations'
                    buttonTitle='Next'
                    onPress={() => {
                        props.navigation.navigate('TutorialStepTwo');
                    }}
                />
            </View>
        </GeneralScreenContainer>
    );
};

export const TutorialStepTwoScreen = (
    props: StackScreenTutorialStepTwoProps
) => {
    return (
        <GeneralScreenContainer>
            <View style={styles.container}>
                <TutorialCard
                    iconComponent={<VideoIcon />}
                    heading='Video sharing'
                    text='Share your camera and see others'
                    buttonTitle='Next'
                    onPress={() => {
                        props.navigation.navigate('TutorialStepThree');
                    }}
                />
            </View>
        </GeneralScreenContainer>
    );
};

export const TutorialStepThreeScreen = (
    props: StackScreenTutorialStepThreeProps
) => {
    return (
        <GeneralScreenContainer>
            <View style={styles.container}>
                <TutorialCard
                    iconComponent={<WhiteboardIcon />}
                    heading='Whiteboard'
                    text='Collaborative whiteboard where you and others can draw'
                    buttonTitle='Next'
                    onPress={() => {
                        props.navigation.navigate('TutorialStepFour');
                    }}
                />
            </View>
        </GeneralScreenContainer>
    );
};

export const TutorialStepFourScreen = (
    props: StackScreenTutorialStepFourProps
) => {
    return (
        <GeneralScreenContainer>
            <View style={styles.container}>
                <TutorialCard
                    iconComponent={<PresentationIcon />}
                    heading='File sharing'
                    text='Share your presentation with others'
                    buttonTitle='Done'
                    onPress={() => {
                        props.navigation.navigate('Initial');
                    }}
                />
            </View>
        </GeneralScreenContainer>
    );
};
