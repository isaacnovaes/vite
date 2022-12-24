import { useContext, useState, useEffect, useRef } from 'react';
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
import {
    removeDatabaseFile,
    updateDatabaseFile,
    updateDatabaseFilePage,
    uploadFile,
} from '../../firebase/storageHelpers';
import { database } from '../../firebase/app';
import { ref as databaseRef, onValue, off } from 'firebase/database';
import Loading from '../../components/Loading';

// TODO Handle log out

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
        width: 90,
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

    const [isLoading, setIsLoading] = useState(false);

    const [audienceFile, setAudienceFile] = useState<{
        name: string;
        file: string;
        page: number;
    }>({
        file: '',
        name: '',
        page: 1,
    });

    const audiencePdfRef = useRef<Pdf | null>(null);

    const {
        state: { user },
    } = useContext(Context);

    const removeFileExtension = (fileName: string | null) =>
        fileName ? fileName.slice(0, -4) : '';

    const resetFile = () => {
        setFile(null);
        if (user) {
            removeDatabaseFile(user?.roomId);
        }
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

    // room owner file upload listener
    useEffect(() => {
        const databaseFile = databaseRef(
            database,
            '/presentations/' + `${user ? user.roomId : ''}`
        );
        if (!user?.roomOwner) {
            onValue(databaseFile, (snapshot) => {
                const newFile = snapshot.val() as {
                    name: string;
                    file: string;
                    page: number;
                };
                setAudienceFile(newFile);
            });
        }
        return () => off(databaseFile);
    }, [user]);

    // room owner file page listener
    useEffect(() => {
        const databaseFilePage = databaseRef(
            database,
            '/presentations/' + `${user ? user.roomId : ''}` + '/page'
        );
        if (!user?.roomOwner) {
            onValue(databaseFilePage, (snapshot) => {
                const newPage = snapshot.val() as number;
                if (audiencePdfRef.current) {
                    audiencePdfRef.current.setPage(newPage);
                }
            });
        }
        return () => off(databaseFilePage);
    }, [user]);

    if (!user) {
        return null;
    }

    console.log(isLoading);

    return (
        <GeneralScreenContainer
            viewStyle={{ padding: file || audienceFile.file ? 0 : 20 }}
        >
            <View style={styles.container}>
                {file && user.roomOwner ? (
                    <>
                        <View style={styles.fileDescriptionContainer}>
                            <Text style={[styles.text, styles.fileName]}>
                                {removeFileExtension(file.name)}
                            </Text>
                            <Pressable onPress={resetFile}>
                                <View style={styles.removeFileContainer}>
                                    <Text style={[styles.text]}>
                                        Remove file
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                        <Pdf
                            source={{ uri: file.uri }}
                            onPageChanged={async (page) => {
                                await updateDatabaseFilePage(user.roomId, page);
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                            style={styles.pdf}
                        />
                    </>
                ) : null}
                {audienceFile.file && !user.roomOwner ? (
                    <>
                        <Text
                            style={[
                                styles.text,
                                styles.fileName,
                                {
                                    textAlign: 'center',
                                    width: '100%',
                                    marginVertical: 10,
                                },
                            ]}
                        >
                            {removeFileExtension(audienceFile.name)}
                        </Text>
                        <Pdf
                            ref={(pdf) => {
                                if (pdf) {
                                    audiencePdfRef.current = pdf;
                                }
                            }}
                            source={{
                                uri: audienceFile.file,
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                            style={styles.pdf}
                            trustAllCerts={false}
                        />
                    </>
                ) : null}
                {!file && user.roomOwner ? (
                    <View style={styles.chooseFileContainer}>
                        <Button
                            label='Choose a file'
                            onPress={() => {
                                DocumentPicker.pick({
                                    type: types.pdf,
                                })
                                    .then(async (files) => {
                                        setIsLoading(true);
                                        const localFile = files[0];
                                        const response = await fetch(
                                            localFile.uri
                                        );
                                        const blob = await response.blob();
                                        const fileName =
                                            files[0].name || 'presentation';
                                        const downloadURL = await uploadFile(
                                            user.roomId,
                                            blob,
                                            fileName
                                        );
                                        await updateDatabaseFile(
                                            user.roomId,
                                            downloadURL,
                                            fileName
                                        );
                                        setFile(files[0]);
                                        setIsLoading(false);
                                    })
                                    .catch(handleError);
                            }}
                        />
                    </View>
                ) : null}
                {!audienceFile.file && !user.roomOwner ? (
                    <View style={styles.chooseFileContainer}>
                        <Text style={styles.text}>No file uploaded</Text>
                    </View>
                ) : null}
            </View>
            {isLoading ? (
                <Loading
                    loadingStyle={{ backgroundColor: colors.foreground }}
                />
            ) : null}
        </GeneralScreenContainer>
    );
};
export default VideoSharingScreen;
