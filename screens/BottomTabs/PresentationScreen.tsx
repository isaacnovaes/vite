import { useContext, useState } from 'react';
import { Dimensions, StyleSheet, View, Text, Pressable } from 'react-native';
import DocumentPicker, {
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import GeneralScreenContainer from '../../components/GeneralScreenContainer';
import Button from '../../components/UI/Button';
import { colors } from '../../Constants/colors';
import { Context } from '../../context/ContextProvider';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chooseFileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeFileContainer: {
        borderWidth: 1,
        borderColor: colors.green,
        width: 70,
        alignItems: 'center',
        borderRadius: 5,
    },
    fileDescriptionContainer: {
        height: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        borderColor: colors.green,
        borderWidth: 3,
        borderRadius: 5,
    },
    text: {
        color: colors.green,
    },
    fileName: {
        width: '70%',
    },
});

const VideoSharingScreen = () => {
    const [file, setFile] = useState<
        DocumentPickerResponse | undefined | null
    >();

    const [currentPage, setCurrentPage] = useState(1);

    const {
        state: { user },
    } = useContext(Context);

    if (!user) {
        return null;
    }

    const removeFileExtension = (fileName: string | null) =>
        fileName ? fileName.slice(0, -4) : '';

    const resetFile = () => {
        setFile(null);
        setCurrentPage(1);
    };

    const handleError = (err: unknown) => {
        if (DocumentPicker.isCancel(err)) {
            console.warn('cancelled');
            // TODO Handle error
            // User cancelled the picker, exit any dialogs or menus and move on
        } else if (isInProgress(err)) {
            console.warn(
                'multiple pickers were opened, only the last will be considered'
            );
        } else {
            throw err;
        }
    };

    return (
        <GeneralScreenContainer viewStyle={{ padding: file ? 0 : 20 }}>
            <View style={styles.container}>
                {file ? (
                    <>
                        <View style={styles.fileDescriptionContainer}>
                            <Text style={[styles.text, styles.fileName]}>
                                {removeFileExtension(file.name)}
                            </Text>
                            {user.roomOwner ? (
                                <Pressable onPress={resetFile}>
                                    <View style={styles.removeFileContainer}>
                                        <Text style={[styles.text]}>
                                            Remove file
                                        </Text>
                                    </View>
                                </Pressable>
                            ) : null}
                        </View>
                        {user.roomOwner ? (
                            <Pdf
                                source={{ uri: file.uri }}
                                onPageChanged={(page) => setCurrentPage(page)} // TODO Update database when room owner changes page
                                onError={(error) => {
                                    console.log(error);
                                }}
                                style={styles.pdf}
                            />
                        ) : (
                            <Pdf
                                source={{ uri: file.uri }}
                                onError={(error) => {
                                    console.log(error);
                                }}
                                style={styles.pdf}
                                page={currentPage} // TODO Update file page for audience when room owner changes page
                            />
                        )}
                    </>
                ) : (
                    <View style={styles.chooseFileContainer}>
                        {user.roomOwner ? (
                            <Button
                                label='Choose a file'
                                onPress={() => {
                                    DocumentPicker.pick({
                                        type: types.pdf,
                                    })
                                        .then((files) => setFile(files[0])) // TODO: Upload room owner's file
                                        .catch(handleError);
                                }}
                            />
                        ) : (
                            <Text style={styles.text}>No file uploaded</Text>
                        )}
                    </View>
                )}
            </View>
        </GeneralScreenContainer>
    );
};
export default VideoSharingScreen;
