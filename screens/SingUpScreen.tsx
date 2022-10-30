import { CredentialsIcon } from '../icons/icons';
import ScreenIconText from '../components/UI/ScreenIconText';
import GeneralScreenContainer from '../components/GeneralScreenContainer';
import Form from '../components/Form';
import { StackScreenSignUpProps } from '../types/navigation';

const SingUpScreen = (props: StackScreenSignUpProps) => {
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
                onSignUp={() => {
                    //TODO => Handle access to protected screens
                    props.navigation.replace('CreateRoom');
                }}
            />
        </GeneralScreenContainer>
    );
};
export default SingUpScreen;
