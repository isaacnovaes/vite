import {
    Text,
    View,
    StyleSheet,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native';
import { colors } from '../../Constants/colors';

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center',
    },
    text: {
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 2.5,
        color: colors.green,
        marginTop: 5,
    },
});

const ScreenIconText = (props: {
    iconComponent: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    label: string;
    labelStyle?: StyleProp<TextStyle>;
}) => {
    return (
        <View style={[styles.container, props.containerStyle]}>
            {props.iconComponent}
            <Text style={[styles.text, props.labelStyle]}>{props.label}</Text>
        </View>
    );
};
export default ScreenIconText;
