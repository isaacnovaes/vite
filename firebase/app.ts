import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    //
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getDatabase(app);
