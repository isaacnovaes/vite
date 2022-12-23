import { storage, database } from './app';
import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from 'firebase/storage';
import { ref as databaseRef, set, onValue, update } from 'firebase/database';

export const uploadFile = async (
    roomId: string,
    file: Blob | Uint8Array | ArrayBuffer,
    fileName: string
) => {
    // TODO Make sure that the file path and file name don't have the forbidden characters #, [, ], *, or ?
    const fileRef = storageRef(storage, `${roomId}/${fileName}.pdf`);
    const response = await uploadBytes(fileRef, file);
    return getDownloadURL(response.ref);
};

export const updateDatabaseFile = (
    roomId: string,
    filePath: string,
    fileName: string
) => {
    const updates: Record<string, string> = {};

    updates['/presentations/' + roomId + '/file'] = filePath;
    updates['/presentations/' + roomId + '/name'] = fileName;

    return update(databaseRef(database), updates);
};

export const readDatabaseFile = (
    roomId: string,
    updateUICallback: (newData: {
        name: string;
        file: string;
        page: number;
    }) => void
) => {
    const databaseFile = databaseRef(database, '/presentations/' + roomId);

    return onValue(databaseFile, (snapshot) => {
        const newFile = snapshot.val() as {
            name: string;
            file: string;
            page: number;
        };
        updateUICallback(newFile);
    });
};

export const updateDatabaseFilePage = (roomId: string, filePage: number) => {
    return set(
        databaseRef(database, '/presentations/' + roomId + '/page'),
        filePage
    );
};
