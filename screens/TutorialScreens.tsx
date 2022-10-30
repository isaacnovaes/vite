import { View, StyleSheet } from 'react-native';
import TutorialCard from '../components/UI/TutorialCard';
import { DescriptionIcon, VideoIcon, WhiteboardIcon } from '../icons/icons';
import GeneralScreenContainer from '../components/GeneralScreenContainer';
import {
    StackScreenTutorialStepOneProps,
    StackScreenTutorialStepTwoProps,
    StackScreenTutorialStepThreeProps,
    StackScreenTutorialStepFourProps,
} from '../types/navigation';

const styles = StyleSheet.create({
    container: {
        marginTop: 110,
    },
});

export const TutorialStepOneScreen = (
    props: StackScreenTutorialStepOneProps
) => {
    return (
        <GeneralScreenContainer>
            <View style={styles.container}>
                <TutorialCard
                    iconComponent={<DescriptionIcon />}
                    heading='Description'
                    text='Vite makes online lectures more interactive. Share your camera, draw on whiteboard and share your presentations'
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
                    text='Interactive whiteboard where you and others can draw'
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
                    iconComponent={<DescriptionIcon />}
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
