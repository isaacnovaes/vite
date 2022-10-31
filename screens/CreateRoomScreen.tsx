import GeneralScreenContainer from '../components/GeneralScreenContainer';
import ScreenIconText from '../components/UI/ScreenIconText';
import { CreateRoomIcon } from '../icons/icons';
import Form from '../components/Form';
import { StackScreenCreateRoomProps } from '../types/navigation';
import { Context } from '../context/ContextProvider';
import { useContext } from 'react';

const CreateRoomScreen = (props: StackScreenCreateRoomProps) => {
    const {
        state: { user },
    } = useContext(Context);
    return (
        <GeneralScreenContainer>
            {user ? (
                <>
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
                </>
            ) : null}
        </GeneralScreenContainer>
    );
};
export default CreateRoomScreen;
