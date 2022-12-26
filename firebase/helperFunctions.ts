import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

import { ref, set, get, update, child } from 'firebase/database';

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

    const updates: Record<string, boolean | string | number> = {};

    if (!existingRoom) {
        // room does not exist, then create room on roomsIds node and owner node inside roomId
        updates['/roomsIds/' + roomId] = true;
        updates['/rooms/' + roomId + '/owner'] = userId;
        updates['/whiteboards/' + roomId] = '';
        updates['/presentations/' + roomId + '/file'] = '';
        updates['/presentations/' + roomId + '/name'] = '';
        updates['/presentations/' + roomId + '/page'] = 1;
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

export const clearWhiteBoard = (roomId: string) => {
    return set(ref(database, '/whiteboards/' + roomId), '');
};

// log off

export const logOff = async (roomId: string, isRoomOwner: boolean) => {
    const updates: Record<string, null> = {};

    updates['/roomsIds/' + roomId] = null;
    updates['/rooms/' + roomId] = null;
    updates['/whiteboards/' + roomId] = null;
    updates['/presentations/' + roomId] = null;

    if (isRoomOwner) {
        await update(ref(database), updates);
    }
    await signOut(auth);

    return;
};
