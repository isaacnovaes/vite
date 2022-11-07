import { View, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../Constants/colors';
import Button from './UI/Button';

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
    message: {
        color: colors.white,
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

const Error = (props: {
    message: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}) => {
    return (
        <View style={[styles.container, props.style ? props.style : null]}>
            <Text style={[styles.message, styles.title]}>
                An error occurred!
            </Text>
            <Text style={styles.message}>{props.message}</Text>
            <Button label='Okay' onPress={props.onPress} />
        </View>
    );
};
export default Error;
