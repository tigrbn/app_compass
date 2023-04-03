import React, { FC, useState } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Button,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Text,
    View,
    Pressable,
    Alert
} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { AuthStackParamList } from '../routes/AuthStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackNavigationProp<AuthStackParamList, 'ForgotPass'>;

const ForgotPass: FC = () => {
    const navigation = useNavigation<Props>();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const resetUserPassword = async () => {
        auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                setSubmitted(true);
                setError(null);
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    Alert.alert('Пользователь не найден');
                } else {
                    Alert.alert('Возникла проблема с вашим запросом');
                }
            });
    };

    return (
        <View
            style={{ backgroundColor: 'white', width: '100%', height: '100%' }}
        >
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Сбросить пароль</Text>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>Вернуться к авторизации</Text>
                    </Pressable>

                    {submitted ? (
                        <Text style={{ color: 'green' }}>
                            Пожалуйста, проверьте свою электронную почту на
                            наличие ссылки для сброса пароля.
                        </Text>
                    ) : (
                        <>
                            <View style={styles.textInput}>
                                <Icon
                                    style={styles.icon}
                                    name="envelope"
                                    size={18}
                                    color="gray"
                                />
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    placeholder="Электронная почта"
                                    autoCapitalize="none"
                                    style={styles.input}
                                />
                            </View>
                            <Pressable
                                style={styles.pressable}
                                onPress={resetUserPassword}
                                disabled={!email}
                            >
                                <Text style={styles.pressableText}>
                                    Подтвердить
                                </Text>
                            </Pressable>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
};

export default ForgotPass;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16
    },

    title: {
        fontSize: 32,
        color: '#0053A9',
        textAlign: 'left',
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold'
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
        borderRadius: 20,
        margin: 10
    },
    textInput: {
        backgroundColor: '#F3F4F6',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flexDirection: 'row',
        borderRadius: 20,
        marginVertical: 6
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
