import { useMemo, createContext, useReducer } from 'react';
interface User {
    id: string;
    email: string;
}

type ActionType = { type: 'SET_USER'; user: User } | { type: 'LOG_OUT' };

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
                ...state,
                user: action.user,
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
