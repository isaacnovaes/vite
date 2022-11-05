import { View, Text, StyleSheet } from 'react-native';
import GeneralScreenContainer from '../../components/GeneralScreenContainer';
import { colors } from '../../Constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.green,
    },
});

const VideoSharingScreen = () => {
    return (
        <GeneralScreenContainer>
            <View style={styles.container}>
                <Text style={styles.text}>To be done</Text>
            </View>
        </GeneralScreenContainer>
    );
};
export default VideoSharingScreen;
