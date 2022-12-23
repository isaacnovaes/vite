import { View, StyleSheet, Text } from 'react-native';
import GeneralScreenContainer from '../../components/GeneralScreenContainer';
import { colors } from '../../Constants/colors';
import VideoShare from './VideoShare/VideoShare';

const styles = StyleSheet.create({
    generalScreenOverwrite: {
        padding: 0,
    },
    container: {
        flex: 1,
        // justifyContent: 'center', // exclude for VideoShare
        // alignItems: 'center', // exclude for VideoShare
    },
    text: {
        color: colors.green,
    },
});

const VideoSharingScreen = () => {
    return (
        <GeneralScreenContainer viewStyle={styles.generalScreenOverwrite}>
            <View style={styles.container}>
                {/* <VideoShare /> */}
                <Text style={styles.text}>To be done</Text>
            </View>
        </GeneralScreenContainer>
    );
};
export default VideoSharingScreen;
