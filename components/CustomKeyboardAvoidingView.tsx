import { ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { colors } from '../Constants/colors';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    innerContainer: {
        flex: 1,
    },
});

const CustomKeyboardAvoidingView = (props: { children: React.ReactNode }) => {
    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.innerContainer}
                keyboardVerticalOffset={20}
                behavior='position'
            >
                {props.children}
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
export default CustomKeyboardAvoidingView;
