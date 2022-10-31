import { Pressable, View, StyleSheet } from 'react-native';
import GeneralScreenContainer from '../components/GeneralScreenContainer';
import Button from '../components/UI/Button';
import ScreenIconText from '../components/UI/ScreenIconText';
import { InformationIcon, ViteLogo } from '../icons/icons';
import { StackScreenInitialProps } from '../types/navigation';

const styles = StyleSheet.create({
    informationIconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

const InitialScreen = (props: StackScreenInitialProps) => {
    const onInformationPressHandler = () => {
        props.navigation.navigate('TutorialStepOne');
    };
    return (
        <GeneralScreenContainer>
            <View style={styles.informationIconContainer}>
                <Pressable onPress={onInformationPressHandler}>
                    <InformationIcon />
                </Pressable>
            </View>
            <ScreenIconText label='Vite' iconComponent={<ViteLogo />} />
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Button
                    label='Log in'
                    onPress={() => {
                        props.navigation.navigate('Login');
                    }}
                />
                <Button
                    label='Sing up'
                    onPress={() => props.navigation.navigate('SignUp')}
                    styles={{ marginTop: 30 }}
                />
            </View>
        </GeneralScreenContainer>
    );
};
export default InitialScreen;
