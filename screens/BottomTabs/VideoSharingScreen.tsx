import { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Modal, Pressable } from 'react-native';
import GeneralScreenContainer from '../../components/GeneralScreenContainer';
import Button from '../../components/UI/Button';
import { colors } from '../../Constants/colors';
import { Context } from '../../context/ContextProvider';
import { LeaveRoom } from '../../icons/icons';
import { BottomTabVideoSharingProps } from '../../types/navigation';
import VideoShare from './VideoShare/VideoShare';

const styles = StyleSheet.create({
    generalScreenOverwrite: {
        padding: 0,
    },
    container: {
        flex: 1,
        // justifyContent: 'center', // exclude for VideoShare
        // alignItems: 'center', // exclude for VideoShare
    },
    text: {
        color: colors.green,
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

const VideoSharingScreen = (props: BottomTabVideoSharingProps) => {
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    const { dispatch } = useContext(Context);

    useEffect(() => {
        props.navigation.setOptions({
            title: 'Video Sharing',
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => {
                return (
                    <Pressable onPress={() => setShowSettingsModal(true)}>
                        <LeaveRoom />
                    </Pressable>
                );
            },
        });
    }, [props.navigation]);

    return (
        <GeneralScreenContainer viewStyle={styles.generalScreenOverwrite}>
            <View style={styles.container}>
                {showSettingsModal ? (
                    <Modal
                        animationType='slide'
                        onRequestClose={() => setShowSettingsModal(false)}
                        presentationStyle='pageSheet'
                    >
                        <View style={styles.modal}>
                            <Text style={[styles.heading]}>
                                Do you want to leave the room?
                            </Text>
                            <Button
                                label='Yes'
                                onPress={() => {
                                    setShowSettingsModal(false);
                                    dispatch({
                                        type: 'LEAVE_ROOM',
                                        option: true,
                                    });
                                    props.navigation.replace('CreateRoom');
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
                <VideoShare />
            </View>
        </GeneralScreenContainer>
    );
};
export default VideoSharingScreen;
