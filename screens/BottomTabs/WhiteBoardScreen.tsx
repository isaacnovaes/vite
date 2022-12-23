/* eslint-disable react/no-unstable-nested-components */
import { useRef, useState, useEffect, useContext } from 'react';
import SignatureScreen, {
    SignatureViewRef,
} from 'react-native-signature-canvas';
import GeneralScreenContainer from '../../components/GeneralScreenContainer';
import {
    View,
    Pressable,
    Dimensions,
    StyleSheet,
    Modal,
    Text,
} from 'react-native';
import { VerticalEllipsis } from '../../icons/icons';
import { colors } from '../../Constants/colors';
import { BottomTabWhiteBoardProps } from '../../types/navigation';
import ColorButton from '../../components/ColorButton';
import { PenColors, PenSize } from '../../types/Common';
import PenSizeButton from '../../components/PenSizeButton';
import {
    updateWhiteBoard,
    clearWhiteBoard,
} from '../../firebase/helperFunctions';
import { Context } from '../../context/ContextProvider';
import { ref as databaseRef, onValue, off } from 'firebase/database';
import { database } from '../../firebase/app';

const styles = StyleSheet.create({
    signatureScreen: {
        flex: 1,
        borderColor: colors.green,
        borderWidth: 3,
        borderRadius: 10,
        overflow: 'hidden',
    },
    modal: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: colors.background,
    },
    colorsContainer: {
        marginTop: 10,
        paddingVertical: 30,
        paddingHorizontal: 5,
        borderRadius: 10,
        height: 22,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    penSizeContainer: {
        paddingVertical: 30,
        paddingHorizontal: 5,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heading: {
        fontSize: 20,
        color: colors.green,
        textAlign: 'center',
    },
    selectPenSizeTextSeparator: {
        marginTop: 20,
    },
    clearButton: {
        backgroundColor: colors.green,
        width: 60,
        marginLeft: 20,
        paddingVertical: 5,
        borderRadius: 10,
    },
    clearButtonText: {
        color: colors.darkText,
        textAlign: 'center',
    },
    pressableContainer: {
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
    },
    pressableText: {
        color: colors.green,
        textAlign: 'center',
    },
});

const WhiteBoardScreen = (props: BottomTabWhiteBoardProps) => {
    const ref = useRef<SignatureViewRef>(null);

    const {
        state: { user },
    } = useContext(Context);

    const [data, setData] = useState('signature');
    const [penColor, setPenColor] = useState<PenColors>('black');
    const [penSize, setPenSize] = useState<PenSize>(0);
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    useEffect(() => {
        const whiteboard = databaseRef(
            database,
            '/whiteboards/' + `${user ? user.roomId : ''}`
        );

        onValue(whiteboard, (snapshot) => setData(snapshot.val()));

        return () => off(whiteboard);
    }, [user]);

    useEffect(() => {
        props.navigation.setOptions({
            title: 'Whiteboard',
            headerRight: () => (
                <Pressable onPress={() => setShowSettingsModal(true)}>
                    <VerticalEllipsis />
                </Pressable>
            ),
            headerLeft: () => {
                return user?.roomOwner ? (
                    <Pressable
                        style={styles.clearButton}
                        onPress={() => ref.current?.clearSignature()}
                        android_ripple={{ color: colors.gray }}
                    >
                        <Text style={styles.clearButtonText}>Clear</Text>
                    </Pressable>
                ) : null;
            },
        });
    }, [props.navigation, user?.roomOwner]);

    const handleOK = async (signature: string) => {
        if (!user) return;
        try {
            await updateWhiteBoard(user.roomId, signature);
        } catch {
            console.log('error while updating whiteboard');
        }
    };

    const handleEnd = () => {
        ref.current?.readSignature();
    };

    const handleClear = async () => {
        if (!user || !user.roomOwner) return;
        try {
            await clearWhiteBoard(user.roomId);
        } catch {
            console.log('error while clearing whiteboard');
        }
    };

    const webStyle = `
            .m-signature-pad {box-shadow: none; border: none;}
            .m-signature-pad--footer {display: none; margin: 0px;}
            .m-signature-pad--body {border: none;}
            body, html {
              width: ${screenWidth - 50}px; height: ${screenHeight - 100}px;
            };
    `;

    return (
        <GeneralScreenContainer>
            {user ? (
                showSettingsModal ? (
                    <Modal
                        animationType='slide'
                        onRequestClose={() => setShowSettingsModal(false)}
                        presentationStyle='pageSheet'
                    >
                        <View style={styles.modal}>
                            <Text style={styles.heading}>Select a color</Text>
                            <View style={styles.colorsContainer}>
                                <ColorButton
                                    buttonColor='black'
                                    penColor={penColor}
                                    onPress={() => setPenColor('black')}
                                />
                                <ColorButton
                                    buttonColor='blue'
                                    penColor={penColor}
                                    onPress={() => setPenColor('blue')}
                                />
                                <ColorButton
                                    buttonColor='yellow'
                                    penColor={penColor}
                                    onPress={() => setPenColor('yellow')}
                                />
                                <ColorButton
                                    buttonColor='red'
                                    penColor={penColor}
                                    onPress={() => setPenColor('red')}
                                />
                            </View>
                            <Text
                                style={[
                                    styles.heading,
                                    styles.selectPenSizeTextSeparator,
                                ]}
                            >
                                Change pen size
                            </Text>
                            <View style={styles.penSizeContainer}>
                                <PenSizeButton
                                    onPress={() => setPenSize(0)}
                                    penSize={penSize}
                                    size={0}
                                />
                                <PenSizeButton
                                    onPress={() => setPenSize(2)}
                                    penSize={penSize}
                                    size={2}
                                />
                                <PenSizeButton
                                    onPress={() => setPenSize(4)}
                                    penSize={penSize}
                                    size={4}
                                />
                            </View>
                            <Pressable
                                style={styles.pressableContainer}
                                android_ripple={{ color: colors.gray }}
                                onPress={() => setShowSettingsModal(false)}
                            >
                                <Text style={styles.pressableText}>Save</Text>
                            </Pressable>
                        </View>
                    </Modal>
                ) : (
                    <SignatureScreen
                        ref={ref}
                        onOK={handleOK}
                        onEnd={handleEnd}
                        onClear={handleClear}
                        minWidth={penSize}
                        maxWidth={penSize + 2}
                        imageType='image/png'
                        dataURL={data}
                        penColor={penColor}
                        style={styles.signatureScreen}
                        webStyle={webStyle}
                    />
                )
            ) : null}
        </GeneralScreenContainer>
    );
};

export default WhiteBoardScreen;
