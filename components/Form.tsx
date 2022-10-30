import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../Constants/colors';
import Button from './UI/Button';

interface FormState {
    name: string;
    nickName: string;
    email: string;
    password: string;
    roomId: string;
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        color: colors.white,
        fontSize: 14,
        letterSpacing: 1.5,
    },
    input: {
        marginTop: 5,
        paddingHorizontal: 4,
        paddingVertical: 12,
        backgroundColor: colors.foreground,
        borderRadius: 8,
        fontSize: 14,
        color: colors.green,
        letterSpacing: 1.5,
    },
});

const Form = (props: {
    type: 'LogIn' | 'SignUp' | 'CreateRoom';
    onLogIn?: (
        data: Omit<FormState, 'nickName' | 'password' | 'roomId'>
    ) => void;
    onSignUp?: (data: Omit<FormState, 'nickName' | 'roomId'>) => void;
    onCreateRoom?: (
        data: Omit<FormState, 'name' | 'password' | 'email'>
    ) => void;
}) => {
    const [formState, setFormState] = useState<FormState>({
        name: '',
        nickName: '',
        email: '',
        password: '',
        roomId: '',
    });

    return (
        <View>
            {props.type === 'SignUp' || props.type === 'CreateRoom' ? (
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        {props.type === 'SignUp' ? 'Name' : 'NickName'}
                    </Text>
                    <TextInput
                        autoComplete='name'
                        cursorColor={colors.green}
                        keyboardType='default'
                        placeholder={`Enter your ${
                            props.type === 'SignUp' ? 'name' : 'nickName'
                        }`}
                        placeholderTextColor={colors.gray}
                        returnKeyType='next'
                        style={styles.input}
                        onChangeText={(text) => {
                            if (!text) return;
                            setFormState((state) => {
                                if (props.type === 'SignUp') {
                                    return { ...state, name: text };
                                }
                                return {
                                    ...state,
                                    nickName: text,
                                };
                            });
                        }}
                    />
                </View>
            ) : null}
            {props.type === 'LogIn' || props.type === 'SignUp' ? (
                <>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            autoComplete='email'
                            cursorColor={colors.green}
                            keyboardType='email-address'
                            placeholder='Enter your email'
                            placeholderTextColor={colors.gray}
                            returnKeyType='next'
                            style={styles.input}
                            onChangeText={(text) => {
                                if (!text) return;
                                setFormState((state) => {
                                    return {
                                        ...state,
                                        email: text,
                                    };
                                });
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            autoComplete='password'
                            cursorColor={colors.green}
                            keyboardType='default'
                            placeholder='Enter your password'
                            placeholderTextColor={colors.gray}
                            returnKeyType='done'
                            secureTextEntry={true}
                            style={styles.input}
                            onChangeText={(text) => {
                                if (!text) return;
                                setFormState((state) => {
                                    return {
                                        ...state,
                                        password: text,
                                    };
                                });
                            }}
                        />
                    </View>
                </>
            ) : (
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Room id</Text>
                    <TextInput
                        autoComplete='name'
                        cursorColor={colors.green}
                        keyboardType='default'
                        placeholder='Enter room id'
                        placeholderTextColor={colors.gray}
                        returnKeyType='done'
                        style={styles.input}
                        onChangeText={(text) => {
                            if (!text) return;
                            setFormState((state) => {
                                return {
                                    ...state,
                                    roomId: text,
                                };
                            });
                        }}
                    />
                </View>
            )}
            <View>
                <Button
                    label={
                        props.type === 'LogIn'
                            ? 'Log in'
                            : props.type === 'SignUp'
                            ? 'Sign up'
                            : 'Create room'
                    }
                    onPress={() => {
                        // TODO => Add validation

                        if (props.type === 'LogIn' && props.onLogIn) {
                            props.onLogIn({
                                name: formState.name,
                                email: formState.email,
                            });
                        }
                        if (props.type === 'SignUp' && props.onSignUp) {
                            props.onSignUp({
                                name: formState.name,
                                email: formState.email,
                                password: formState.password,
                            });
                        }
                        if (props.type === 'CreateRoom' && props.onCreateRoom) {
                            props.onCreateRoom({
                                nickName: formState.nickName,
                                roomId: formState.roomId,
                            });
                        }
                    }}
                />
            </View>
        </View>
    );
};
export default Form;
