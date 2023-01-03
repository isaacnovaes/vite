import { useMemo, createContext, useReducer } from 'react';
interface User {
    id: string;
    email: string;
    nickName: string;
    roomId: string;
    roomOwner: boolean;
    isLeaveRoom: boolean;
}

type ActionType =
    | {
          type: 'SET_USER';
          user: Omit<User, 'nickName' | 'roomId' | 'roomOwner'>;
      }
    | {
          type: 'ADD_ROOM_INFORMATION';
          nickName: string;
          roomId: string;
          existingRoom: boolean;
      }
    | { type: 'LEAVE_ROOM'; option: boolean }
    | { type: 'LOG_OUT' };

type StateType = {
    user: User | null;
};

const initialState: StateType = {
    user: null,
};

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'SET_USER': {
            return {
                user: {
                    ...action.user,
                    nickName: '',
                    roomId: '',
                    roomOwner: false,
                },
            };
        }
        case 'ADD_ROOM_INFORMATION': {
            if (state.user === null) return state;
            return {
                user: {
                    ...state.user,
                    nickName: action.nickName,
                    roomId: action.roomId,
                    roomOwner: !action.existingRoom,
                },
            };
        }
        case 'LEAVE_ROOM': {
            if (state.user === null) return state;
            return {
                user: {
                    ...state.user,
                    isLeaveRoom: action.option,
                },
            };
        }
        case 'LOG_OUT': {
            if (state.user === null) return state;
            return {
                user: null,
            };
        }
        default:
            return state;
    }
};

const Context = createContext<{
    state: StateType;
    dispatch: React.Dispatch<ActionType>;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ state: initialState, dispatch: () => {} });

type ProviderPropsType = {
    children: React.ReactNode;
};

function ContextProvider({ children }: ProviderPropsType) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const data = useMemo(() => {
        return { state, dispatch };
    }, [state]);

    return <Context.Provider value={data}>{children}</Context.Provider>;
}

export { Context, ContextProvider };
