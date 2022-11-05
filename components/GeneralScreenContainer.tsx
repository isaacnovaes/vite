import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
const GeneralScreenContainer = (props: {
    children: React.ReactNode;
    viewStyle?: StyleProp<ViewStyle>;
}) => {
    return (
        <View style={[styles.container, props.viewStyle]}>
            {props.children}
        </View>
    );
};
export default GeneralScreenContainer;
