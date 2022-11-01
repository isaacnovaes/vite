import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../Constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
});

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={colors.green} />
        </View>
    );
};
export default Loading;
