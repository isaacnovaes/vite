import { CredentialsIcon } from '../icons/icons';
import ScreenIconText from '../components/UI/ScreenIconText';
import GeneralScreenContainer from '../components/GeneralScreenContainer';
import Form from '../components/Form';
import { StackScreenSignUpProps } from '../types/navigation';
import { signUp } from '../firebase/helperFunctions';
import { useContext, useState } from 'react';
import { Context } from '../context/ContextProvider';
import CustomKeyboardAvoidingView from '../components/CustomKeyboardAvoidingView';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    iconTextContainer: { height: 150, marginTop: 10 },
    iconTextLabel: {
        fontSize: 25,
    },
    error: {
        height: '110%',
    },
});

const SingUpScreen = (props: StackScreenSignUpProps) => {
    const { dispatch } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ state: false, message: '' });

    const resetErrorState = () => setError({ state: false, message: '' });

    return (
        <>
            <GeneralScreenContainer>
                <CustomKeyboardAvoidingView>
                    <ScreenIconText
                        label='Enter your credentials'
                        labelStyle={styles.iconTextLabel}
                        containerStyle={styles.iconTextContainer}
                        iconComponent={<CredentialsIcon />}
                    />
                    <Form
                        type='SignUp'
                        onSignUp={async ({ name, email, password }) => {
                            const formName = name.trim();
                            const formEmail = email.trim();
                            const formPassword = password.trim();

                            if (!formName) {
                                setError({
                                    message: 'Please, enter a name',
                                    state: true,
                                });
                                return;
                            }
                            if (!formEmail) {
                                setError({
                                    message: 'Please, enter an email',
                                    state: true,
                                });
                                return;
                            }
                            if (!formPassword) {
                                setError({
                                    message: 'Please, enter a password',
                                    state: true,
                                });
                                return;
                            }
                            setIsLoading(true);
                            try {
                                const userCredentials = await signUp(
                                    formEmail,
                                    formPassword
                                );
                                dispatch({
                                    type: 'SET_USER',
                                    user: {
                                        email: formEmail,
                                        id: userCredentials.user.uid,
                                    },
                                });
                                props.navigation.replace('CreateRoom');
                            } catch (e: any) {
                                switch (e.code) {
                                    case 'auth/invalid-email': {
                                        setError({
                                            message:
                                                'Please, enter a valid email',
                                            state: true,
                                        });
                                        break;
                                    }
                                    case 'auth/email-already-in-use': {
                                        setError({
                                            message:
                                                'Please, enter another email. This email is already in use',
                                            state: true,
                                        });
                                        break;
                                    }
                                    case 'auth/weak-password': {
                                        setError({
                                            message:
                                                'Please, enter a stronger password',
                                            state: true,
                                        });
                                        break;
                                    }
                                    case 'auth/too-many-requests': {
                                        setError({
                                            message:
                                                'Too many attempts. Please try again later',
                                            state: true,
                                        });
                                        break;
                                    }
                                    default: {
                                        console.log(JSON.stringify(e));
                                        setError({
                                            message: 'Error while signing up',
                                            state: true,
                                        });
                                    }
                                }
                            }
                            setIsLoading(false);
                        }}
                    />
                </CustomKeyboardAvoidingView>
                {error.state ? (
                    <Error
                        message={error.message}
                        onPress={resetErrorState}
                        style={styles.error}
                    />
                ) : null}
            </GeneralScreenContainer>
            {isLoading ? <Loading /> : null}
        </>
    );
};

export default SingUpScreen;
