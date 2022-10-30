import Form from '../components/Form';
import GeneralScreenContainer from '../components/GeneralScreenContainer';
import ScreenIconText from '../components/UI/ScreenIconText';
import { CredentialsIcon } from '../icons/icons';
import { StackScreenLoginProps } from '../types/navigation';

const LogInScreen = (props: StackScreenLoginProps) => {
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
                onLogIn={() => {
                    //TODO => Handle access to protected screens
                    props.navigation.replace('CreateRoom');
                }}
            />
        </GeneralScreenContainer>
    );
};
export default LogInScreen;
