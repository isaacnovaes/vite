import Form from '../components/Form';
import GeneralScreenContainer from '../components/GeneralScreenContainer';
import ScreenIconText from '../components/UI/ScreenIconText';
import { CredentialsIcon } from '../icons/icons';
import { StackScreenLoginProps } from '../types/navigation';
import { signIn } from '../firebase';
import { Context } from '../context/ContextProvider';
import { useContext } from 'react';

const LogInScreen = (props: StackScreenLoginProps) => {
    const { dispatch } = useContext(Context);

    return (
        <GeneralScreenContainer>
            <ScreenIconText
                label='Enter your credentials'
                labelStyle={{ fontSize: 25 }}
                iconComponent={<CredentialsIcon />}
                containerStyle={{ height: 170, marginTop: 20 }}
            />
            <Form
                type='LogIn'
                onLogIn={async ({ email, password }) => {
                    //TODO => Handle access to protected screens
                    try {
                        const userCredentials = await signIn(email, password);
                        dispatch({
                            type: 'SET_USER',
                            user: { email, id: userCredentials.user.uid },
                        });
                    } catch (error) {
                        console.log(JSON.stringify(error));
                    }
                    props.navigation.replace('CreateRoom');
                }}
            />
        </GeneralScreenContainer>
    );
};
export default LogInScreen;
