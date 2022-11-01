import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { colors } from '../Constants/colors';
import { useHeaderHeight } from '@react-navigation/elements';

const CustomKeyboardAvoidingView = (props: { children: React.ReactNode }) => {
    const headerHeight = useHeaderHeight();
    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: colors.background,
            }}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                keyboardVerticalOffset={20}
                behavior='position'
            >
                {props.children}
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
export default CustomKeyboardAvoidingView;
