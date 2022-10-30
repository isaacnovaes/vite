import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import Button from './Button';
import { colors } from '../../Constants/colors';

interface TutorialCardProps {
    iconComponent: React.ReactNode;
    heading: string;
    text: string;
    buttonTitle: string;
    onPress: ((event: GestureResponderEvent) => void) | null | undefined;
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderColor: colors.green,
        borderRadius: 20,
        borderWidth: 3,
        alignItems: 'center',
    },
    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: colors.green,
        marginTop: 30,
    },
    text: {
        width: '80%',
        fontSize: 20,
        color: colors.white,
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 30,
    },
});

const TutorialCard = (props: TutorialCardProps) => {
    return (
        <View style={styles.container}>
            {props.iconComponent}
            <Text style={styles.heading}>{props.heading}</Text>
            <Text style={styles.text}>{props.text}</Text>
            <Button label={props.buttonTitle} onPress={props.onPress} />
        </View>
    );
};
export default TutorialCard;
