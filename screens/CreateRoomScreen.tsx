import GeneralScreenContainer from '../components/GeneralScreenContainer';
import ScreenIconText from '../components/UI/ScreenIconText';
import { CreateRoomIcon, LogOff } from '../icons/icons';
import Form from '../components/Form';
import { StackScreenCreateRoomProps } from '../types/navigation';
import { Context } from '../context/ContextProvider';
import { useContext, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Pressable, Modal, View, Text } from 'react-native';
import CustomKeyboardAvoidingView from '../components/CustomKeyboardAvoidingView';
import {
    createRoom,
    leaveRoom,
    logOff,
    roomExist,
} from '../firebase/helperFunctions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/UI/Button';
import { colors } from '../Constants/colors';

const styles = StyleSheet.create({
    iconTextContainer: { height: 170, marginTop: 20, marginBottom: 10 },
    iconTextLabel: {
        fontSize: 25,
    },
    heading: {
        fontSize: 20,
        color: colors.green,
        textAlign: 'center',
        marginBottom: 30,
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: colors.background,
    },
    modalButton: {
        marginBottom: 30,
    },
});

const CreateRoomScreen = (props: StackScreenCreateRoomProps) => {
    const {
        state: { user },
        dispatch,
    } = useContext(Context);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ state: false, message: '' });
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    const resetErrorState = () => setError({ state: false, message: '' });

    const logUserOut = useCallback(async () => {
        dispatch({ type: 'LOG_OUT' });
        await logOff();
        props.navigation.replace('Initial');
    }, [dispatch, props.navigation]);

    useEffect(() => {
        const cleanRoomDate = async () => {
            if (user) {
                await leaveRoom(user.roomId, user.id, user.roomOwner);
                dispatch({ type: 'LEAVE_ROOM', option: false });
            }
        };

        if (user && user.isLeaveRoom) {
            cleanRoomDate();
        }
    }, [dispatch, user]);

    useEffect(() => {
        props.navigation.setOptions({
            title: 'Create Room',
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => {
                return (
                    <Pressable onPress={() => setShowSettingsModal(true)}>
                        <LogOff />
                    </Pressable>
                );
            },
        });
    }, [props.navigation]);

    return (
        <GeneralScreenContainer>
            <CustomKeyboardAvoidingView>
                {showSettingsModal ? (
                    <Modal
                        animationType='slide'
                        onRequestClose={() => setShowSettingsModal(false)}
                        presentationStyle='pageSheet'
                    >
                        <View style={styles.modal}>
                            <Text style={[styles.heading]}>
                                Do you want to log out?
                            </Text>
                            <Button
                                label='Yes'
                                onPress={() => {
                                    setShowSettingsModal(false);
                                    logUserOut();
                                }}
                                styles={styles.modalButton}
                            />
                            <Button
                                label='No'
                                onPress={() => setShowSettingsModal(false)}
                                styles={styles.modalButton}
                            />
                        </View>
                    </Modal>
                ) : null}
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
                                const formNickName = nickName.trim();
                                const formRoomId = roomId.trim();
                                if (!formNickName) {
                                    setError({
                                        message: 'Please, enter your nick name',
                                        state: true,
                                    });
                                    return;
                                }

                                if (!formRoomId) {
                                    setError({
                                        message: 'Please, enter the room id',
                                        state: true,
                                    });
                                    return;
                                }

                                // eslint-disable-next-line no-useless-escape
                                const forbiddenPattern = /[\.$#\[\]\\]/;
                                if (forbiddenPattern.test(formRoomId)) {
                                    setError({
                                        message:
                                            'The room id cannot have the following characters:\n ., $, #, [, ], \\',
                                        state: true,
                                    });
                                    return;
                                }

                                setLoading(true);
                                // check if room already exists
                                const existingRoom = await roomExist(
                                    formRoomId
                                );

                                await createRoom(
                                    user.id,
                                    formNickName,
                                    formRoomId,
                                    !!existingRoom
                                );

                                dispatch({
                                    type: 'ADD_ROOM_INFORMATION',
                                    nickName: formNickName,
                                    roomId: formRoomId,
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
