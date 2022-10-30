import {
    View,
    Pressable,
    Text,
    StyleSheet,
    GestureResponderEvent,
    ViewStyle,
    StyleProp,
} from 'react-native';
import { colors } from '../../Constants/colors';

const styles = StyleSheet.create({
    outerContainer: {
        overflow: 'hidden',
        width: '100%',
        maxWidth: 380,
        borderRadius: 12,
    },
    container: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
    },
    text: {
        color: colors.darkText,
        fontWeight: '600',
        letterSpacing: 2.5,
        fontSize: 20,
        textAlign: 'center',
    },
});

const Button = (props: {
    label: string;
    onPress: ((event: GestureResponderEvent) => void) | null | undefined;
    styles?: StyleProp<ViewStyle>;
}) => {
    return (
        <View style={[styles.outerContainer, props.styles]}>
            <Pressable
                style={styles.container}
                onPress={props.onPress}
                android_ripple={{
                    color: colors.white,
                }}
            >
                <Text style={styles.text}>{props.label}</Text>
            </Pressable>
        </View>
    );
};
export default Button;
