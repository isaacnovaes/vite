import Form from '../components/Form';
import GeneralScreenContainer from '../components/GeneralScreenContainer';
import ScreenIconText from '../components/UI/ScreenIconText';
import { CredentialsIcon } from '../icons/icons';
import { StackScreenLoginProps } from '../types/navigation';
import { signIn } from '../firebase/helperFunctions';
import { Context } from '../context/ContextProvider';
import { useContext, useState } from 'react';
import CustomKeyboardAvoidingView from '../components/CustomKeyboardAvoidingView';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    iconText: {
        fontSize: 25,
    },
    iconTextContainer: {
        height: 170,
        marginTop: 10,
    },
});

const LogInScreen = (props: StackScreenLoginProps) => {
    const { dispatch } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ state: false, message: '' });

    return (
        <GeneralScreenContainer>
            <CustomKeyboardAvoidingView>
                <ScreenIconText
                    label='Enter your credentials'
                    containerStyle={styles.iconTextContainer}
                    labelStyle={styles.iconText}
                    iconComponent={<CredentialsIcon />}
                />
                <Form
                    type='LogIn'
                    onLogIn={async ({ email, password }) => {
                        if (!email) {
                            setError({
                                message: 'Please, enter an email',
                                state: true,
                            });
                            return;
                        }

                        if (!password) {
                            setError({
                                message: 'Please, enter a password',
                                state: true,
                            });
                            return;
                        }

                        setIsLoading(true);
                        try {
                            const userCredentials = await signIn(
                                email,
                                password
                            );
                            dispatch({
                                type: 'SET_USER',
                                user: { email, id: userCredentials.user.uid },
                            });
                            props.navigation.replace('CreateRoom');
                        } catch (e: any) {
                            switch (e.code) {
                                case 'auth/invalid-email': {
                                    setError({
                                        message: 'Please, enter a valid email',
                                        state: true,
                                    });
                                    break;
                                }
                                case 'auth/wrong-password': {
                                    setError({
                                        message:
                                            'Please, enter the correct password',
                                        state: true,
                                    });
                                    break;
                                }
                                case 'auth/user-not-found': {
                                    setError({
                                        message: 'User not found',
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
                                        message: 'Error while logging in',
                                        state: true,
                                    });
                                }
                            }
                        }
                        setIsLoading(false);
                    }}
                />
            </CustomKeyboardAvoidingView>
            {isLoading ? <Loading /> : null}
            {error.state ? (
                <Error
                    message={error.message}
                    onPress={() => setError({ state: false, message: '' })}
                />
            ) : null}
        </GeneralScreenContainer>
    );
};
export default LogInScreen;
