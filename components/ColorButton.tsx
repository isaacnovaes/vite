/* eslint-disable react-native/no-unused-styles */
import { StyleSheet, Pressable } from 'react-native';
import { colors } from '../Constants/colors';
import { PenColors } from '../types/Common';

const styles = StyleSheet.create({
    colorButton: {
        height: 30,
        width: 30,
        borderRadius: 30,
    },
    colorSelected: {
        borderColor: colors.green,
        borderWidth: 2,
    },
    black: {
        backgroundColor: 'black',
    },
    red: {
        backgroundColor: 'red',
    },
    blue: {
        backgroundColor: 'blue',
    },
    yellow: {
        backgroundColor: 'yellow',
    },
});

const ColorButton = (props: {
    onPress: () => void;
    buttonColor: PenColors;
    penColor: PenColors;
}) => {
    return (
        <Pressable
            onPress={props.onPress}
            style={[
                styles.colorButton,
                styles[props.buttonColor],
                props.penColor === props.buttonColor
                    ? styles.colorSelected
                    : null,
            ]}
        />
    );
};
export default ColorButton;
