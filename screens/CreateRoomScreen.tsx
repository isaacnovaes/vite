import GeneralScreenContainer from '../components/GeneralScreenContainer';
import ScreenIconText from '../components/UI/ScreenIconText';
import { CreateRoomIcon } from '../icons/icons';
import Form from '../components/Form';
import { StackScreenCreateRoomProps } from '../types/navigation';
import { Context } from '../context/ContextProvider';
import { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import CustomKeyboardAvoidingView from '../components/CustomKeyboardAvoidingView';
import { createRoom, roomExist } from '../firebase';
import Loading from '../components/Loading';

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
                                setLoading(true);
                                // eslint-disable-next-line no-useless-escape
                                const forbiddenPattern = /[\.$#\[\]\\]/;
                                if (
                                    !roomId ||
                                    !nickName ||
                                    forbiddenPattern.test(roomId)
                                )
                                    return;

                                const existingRoom = await roomExist(roomId);

                                // check if room already exists

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
                                });
                                setLoading(false);
                                props.navigation.replace('BottomTabs');
                            }}
                        />
                        {loading ? <Loading /> : null}
                    </>
                ) : null}
            </CustomKeyboardAvoidingView>
        </GeneralScreenContainer>
    );
};
export default CreateRoomScreen;
