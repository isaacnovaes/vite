import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
const GeneralScreenContainer = (props: { children: React.ReactNode }) => {
    return <View style={styles.container}>{props.children}</View>;
};
export default GeneralScreenContainer;
