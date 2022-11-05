import GeneralScreenContainer from '../components/GeneralScreenContainer';
import ScreenIconText from '../components/UI/ScreenIconText';
import { CreateRoomIcon } from '../icons/icons';
import Form from '../components/Form';
import { StackScreenCreateRoomProps } from '../types/navigation';
import { Context } from '../context/ContextProvider';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import CustomKeyboardAvoidingView from '../components/CustomKeyboardAvoidingView';

const styles = StyleSheet.create({
    iconTextContainer: { height: 170, marginTop: 20, marginBottom: 10 },
    iconTextLabel: {
        fontSize: 25,
    },
});

const CreateRoomScreen = (props: StackScreenCreateRoomProps) => {
    const {
        state: { user },
    } = useContext(Context);
    return (
        <GeneralScreenContainer>
            <CustomKeyboardAvoidingView>
                {user ? (
                    <>
                        <ScreenIconText
                            label='Create a room or enter an existing room'
                            labelStyle={styles.iconTextLabel}
                            containerStyle={styles.iconTextContainer}
                            iconComponent={<CreateRoomIcon />}
                        />
                        <Form
                            type='CreateRoom'
                            onCreateRoom={(data) => {
                                console.log(JSON.stringify(data));
                                props.navigation.replace('BottomTabs');
                            }}
                        />
                    </>
                ) : null}
            </CustomKeyboardAvoidingView>
        </GeneralScreenContainer>
    );
};
export default CreateRoomScreen;
