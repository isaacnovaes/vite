import { StyleSheet, Text, Pressable, View } from 'react-native';
import { colors } from '../Constants/colors';
import { PenSize } from '../types/Common';

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        overflow: 'hidden',
    },
    pressable: { paddingHorizontal: 10, paddingVertical: 5 },
    buttonSelected: {
        borderColor: colors.green,
        borderWidth: 1,
    },
    text: {
        color: colors.white,
        fontSize: 12,
    },
});

const PenSizeButton = (props: {
    onPress: () => void;
    penSize: PenSize;
    size: PenSize;
}) => {
    const sizes: Record<PenSize, 'Small' | 'Medium' | 'Big'> = {
        1: 'Small',
        3: 'Medium',
        6: 'Big',
    };

    return (
        <View
            style={[
                styles.button,
                props.penSize === props.size ? styles.buttonSelected : null,
            ]}
        >
            <Pressable
                onPress={props.onPress}
                style={styles.pressable}
                android_ripple={{ color: colors.gray }}
            >
                <Text style={styles.text}>{sizes[props.size]}</Text>
            </Pressable>
        </View>
    );
};
export default PenSizeButton;
