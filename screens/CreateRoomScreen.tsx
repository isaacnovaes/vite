import GeneralScreenContainer from '../components/GeneralScreenContainer';
import ScreenIconText from '../components/UI/ScreenIconText';
import { CreateRoomIcon } from '../icons/icons';
import Form from '../components/Form';
import { StackScreenCreateRoomProps } from '../types/navigation';

const CreateRoomScreen = (props: StackScreenCreateRoomProps) => {
    return (
        <GeneralScreenContainer>
            <ScreenIconText
                label='Create a room or enter an existing room'
                labelStyle={{ fontSize: 25 }}
                iconComponent={<CreateRoomIcon />}
                containerStyle={{
                    height: 170,
                    marginTop: 20,
                    marginBottom: 10,
                }}
            />
            <Form
                type='CreateRoom'
                onCreateRoom={(data) => {
                    console.log(JSON.stringify(data));
                }}
            />
        </GeneralScreenContainer>
    );
};
export default CreateRoomScreen;
