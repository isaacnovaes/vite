import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

import { ref, set, get, update, child, onValue } from 'firebase/database';

import { auth, database } from './app';

// login or sign up

export const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// create room

export const createRoom = (
    userId: string,
    nickName: string,
    roomId: string,
    existingRoom: boolean
) => {
    // Get key for the room

    const updates: Record<
        string,
        Record<'nickName' | 'roomId', string> | boolean | string
    > = {};

    if (!existingRoom) {
        // room does not exist, then create room on roomsIds node and owner node inside roomId
        updates['/roomsIds/' + roomId] = true;
        updates['/rooms/' + roomId + '/owner'] = userId;
        updates['/whiteboards/' + roomId] = '';
    }

    updates['/rooms/' + roomId + '/members/' + userId] = nickName;

    return update(ref(database), updates);
};

export const roomExist = async (roomId: string) => {
    try {
        const data = await get(child(ref(database), '/roomsIds/' + roomId));
        return data.exists();
    } catch {
        console.log('Error checking room existence');
    }
};

// whiteboard

export const updateWhiteBoard = (roomId: string, data: string) => {
    return set(ref(database, '/whiteboards/' + roomId), data);
};

export const readWhiteBoard = (
    roomId: string,
    updateUICallback: (newData: string | null) => void
) => {
    const whiteboard = ref(database, '/whiteboards/' + roomId);

    return onValue(whiteboard, (snapshot) => {
        const data = snapshot.val();
        updateUICallback(data);
    });
};

export const clearWhiteBoard = (roomId: string) => {
    return set(ref(database, '/whiteboards/' + roomId), '');
};

// log off

export const logOff = async (roomId: string, isOwner: boolean) => {
    const updates: Record<string, null> = {};

    updates['/roomsIds/' + roomId] = null;
    updates['/rooms/' + roomId] = null;
    updates['/whiteboards/' + roomId] = null;

    if (isOwner) {
        await update(ref(database), updates);
    }
    await signOut(auth);

    return;
};
