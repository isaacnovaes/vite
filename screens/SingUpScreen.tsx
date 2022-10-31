import { CredentialsIcon } from '../icons/icons';
import ScreenIconText from '../components/UI/ScreenIconText';
import GeneralScreenContainer from '../components/GeneralScreenContainer';
import Form from '../components/Form';
import { StackScreenSignUpProps } from '../types/navigation';
import { signUp } from '../firebase';
import { useContext } from 'react';
import { Context } from '../context/ContextProvider';

const SingUpScreen = (props: StackScreenSignUpProps) => {
    const { dispatch } = useContext(Context);
    return (
        <GeneralScreenContainer>
            <ScreenIconText
                label='Enter your credentials'
                labelStyle={{ fontSize: 25 }}
                iconComponent={<CredentialsIcon />}
                containerStyle={{ height: 150, marginTop: 20 }}
            />
            <Form
                type='SignUp'
                onSignUp={async ({ name, email, password }) => {
                    //TODO => Handle access to protected screens
                    try {
                        const userCredentials = await signUp(email, password);

                        dispatch({
                            type: 'SET_USER',
                            user: { email, id: userCredentials.user.uid },
                        });
                        props.navigation.replace('CreateRoom');
                    } catch (error) {
                        console.log(JSON.stringify(error));
                    }
                }}
            />
        </GeneralScreenContainer>
    );
};

export default SingUpScreen;
