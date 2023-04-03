import React, { FC, useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {
    Image,
    Pressable,
    StyleSheet,
    TextInput,
    Text,
    View
} from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../providers/AuthProvider';
import { AuthStackParamList } from '../routes/AuthStack';

type Props = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const Login: FC = () => {
    const navigation = useNavigation<Props>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { login } = useContext(AuthContext);

    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    });

    const signIn = async () => {
        var emailValid = false;
        if (email.length == 0) {
            setEmailError('Поле пустое');
        } else if (email.length < 6) {
            setEmailError('Электронная почта должна быть не менее 6 символов');
        } else if (email.indexOf(' ') >= 0) {
            setEmailError('Данное поле не должно содержать пробелы');
        } else {
            setEmailError('');
            emailValid = true;
        }

        var passwordValid = false;
        if (password.length == 0) {
            setPasswordError('Поле пустое');
        } else if (password.length < 6) {
            setPasswordError('Пароль должен быть минимум 6 символов');
        } else if (password.indexOf(' ') >= 0) {
            setPasswordError('Данное поле не должно содержать пробелы');
        } else {
            setPasswordError('');
            passwordValid = true;
        }

        if (emailValid && passwordValid) {
            console.log('Email: ' + email + '\nPassword: ' + password);
            setEmail('');
            setPassword('');
        }
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Нужно ввести электронную почту и пароль'
            });
            return;
        }
        var e = login(value.email, value.password);
        // auth()
        //     .signInWithEmailAndPassword(value.email, value.password)
        //     .then(() => {
        //         navigation.navigate('Home');
        //     })
        //     .catch((error) => {
        //         setValue({
        //             ...value,
        //             error: error.message
        //         });
        //     });
    }

    return (
        <View
            style={{ backgroundColor: 'white', width: '100%', height: '100%' }}
        >
            <View style={styles.container}>
                <View style={{marginTop: 30}}>
                    <View>
                        <Text style={styles.title}>Авторизация</Text>
                        <View style={styles.textInput}>
                            <Icon
                                style={styles.icon}
                                name="envelope"
                                size={20}
                                color="gray"
                            />
                            <TextInput
                                placeholder="Электронная почта"
                                value={value.email}
                                onChangeText={(text) =>
                                    setValue({ ...value, email: text })
                                }
                            />
                            {emailError.length > 0 && (
                                <Text
                                    style={{
                                        color: '#B32535',
                                        fontSize: 10,
                                        fontWeight: 'bold',
                                        padding: 10,
                                        textAlign: 'right',
                                        alignSelf: 'center'
                                    }}
                                >
                                    {emailError}
                                </Text>
                            )}
                        </View>

                        <View style={styles.textInput}>
                            <Icon
                                style={styles.icon}
                                name="lock"
                                size={20}
                                color="gray"
                            />
                            <TextInput
                                placeholder="Пароль"
                                onChangeText={(text) =>
                                    setValue({ ...value, password: text })
                                }
                                secureTextEntry={true}
                            />
                            {passwordError.length > 0 && (
                                <Text
                                    style={{
                                        color: '#B32535',
                                        fontSize: 10,
                                        fontWeight: 'bold',
                                        padding: 10,
                                        textAlign: 'right',
                                        alignSelf: 'center'
                                    }}
                                >
                                    {passwordError}
                                </Text>
                            )}
                        </View>
                    </View>
                    <Text
                        style={styles.text}
                        onPress={() => navigation.navigate('ForgotPass')}
                    >
                        Забыли пароль?
                    </Text>
                    <Pressable style={styles.pressable}>
                        <Text onPress={() => signIn()} style={styles.pressableText}>
                            Войти
                        </Text>
                    </Pressable>
                </View>
                <Text style={styles.text}>
                    У Вас нет аккаунта?{' '}
                    <Text
                        style={styles.link}
                        onPress={() => navigation.navigate('Register')}
                    >
                        Зарегистрироваться
                    </Text>
                </Text>
                <Text style={{top: 30}}>
                    <Text
                        style={styles.link}
                        onPress={() => navigation.navigate('PhoneLogin')}
                    >
                         Войти по номеру телефона{' '}
                    </Text>
                </Text>
                {/* <View>
            <Feather
                    onPress={() => navigation.navigate("Phone")}
                    name="phone"
                    color="#0E1F40"
                    size={"35"}
                    style={{alignSelf: "center", marginTop: 25}}
                  />
            </View> */}
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        width: '85%',
        top: '10%',
        alignSelf: 'center'
    },

    title: {
        fontSize: 32,
        color: '#0053A9',
        textAlign: 'left',
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold',
        paddingBottom: 25
    },
    icon: {
        padding: 15
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        color: '#424242',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '0%',
        fontFamily: 'Montserrat-Medium'
    },
    text: {
        color: '#0E1F40',
        marginTop: 15,
        fontFamily: 'Montserrat-Medium'
    },
    link: {
        color: '#0053A9',
        fontWeight: 'bold'
    },
    pressable: {
        backgroundColor: '#0053A9',
        width: '100%',
        fontSize: 30,
        alignSelf: 'center',
        borderRadius: 9,
        margin: 20
    },
    textInput: {
        backgroundColor: '#F3F4F6',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flexDirection: 'row',
        borderRadius: 9,
        marginVertical: 10,
    },
    pressableText: {
        color: 'white',
        padding: 15,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium'
    }
});
