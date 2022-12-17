import GeneralScreenContainer from '../components/GeneralScreenContainer';
import ScreenIconText from '../components/UI/ScreenIconText';
import { CreateRoomIcon } from '../icons/icons';
import Form from '../components/Form';
import { StackScreenCreateRoomProps } from '../types/navigation';
import { Context } from '../context/ContextProvider';
import { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import CustomKeyboardAvoidingView from '../components/CustomKeyboardAvoidingView';
import { createRoom, roomExist } from '../firebase/helperFunctions';
import Loading from '../components/Loading';
import Error from '../components/Error';

const styles = StyleSheet.create({
    iconTextContainer: { height: 170, marginTop: 20, marginBottom: 10 },
    iconTextLabel: {
        fontSize: 25,
    },
});

const CreateRoomScreen = (props: StackScreenCreateRoomProps) => {
    const {
        state: { user },
        dispatch,
    } = useContext(Context);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ state: false, message: '' });

    const resetErrorState = () => setError({ state: false, message: '' });

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
                            onCreateRoom={async ({ nickName, roomId }) => {
                                if (!nickName) {
                                    setError({
                                        message: 'Please, enter your nick name',
                                        state: true,
                                    });
                                    return;
                                }

                                if (!roomId) {
                                    setError({
                                        message: 'Please, enter the room id',
                                        state: true,
                                    });
                                    return;
                                }

                                setLoading(true);
                                // eslint-disable-next-line no-useless-escape
                                const forbiddenPattern = /[\.$#\[\]\\]/;
                                if (
                                    !roomId ||
                                    !nickName ||
                                    forbiddenPattern.test(roomId)
                                ) {
                                    return;
                                }

                                // check if room already exists
                                const existingRoom = await roomExist(roomId);

                                await createRoom(
                                    user.id,
                                    nickName,
                                    roomId,
                                    !!existingRoom
                                );

                                dispatch({
                                    type: 'ADD_ROOM_INFORMATION',
                                    nickName,
                                    roomId,
                                    existingRoom: !!existingRoom,
                                });
                                setLoading(false);
                                props.navigation.replace('BottomTabs');
                            }}
                        />
                    </>
                ) : null}
            </CustomKeyboardAvoidingView>
            {error.state ? (
                <Error message={error.message} onPress={resetErrorState} />
            ) : null}
            {loading ? <Loading /> : null}
        </GeneralScreenContainer>
    );
};
export default CreateRoomScreen;
