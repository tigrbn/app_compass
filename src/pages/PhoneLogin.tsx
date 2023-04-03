import React, { FC, useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Image,
    Pressable,
    StyleSheet,
    TextInput,
    Text,
    View
} from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../routes/AuthStack';
import { MaskedTextInput } from "react-native-mask-text";

type Props = NativeStackNavigationProp<AuthStackParamList, 'PhoneLogin'>;

const PhoneLoginScreen: FC = () => {
    const navigation = useNavigation<Props>();
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const { phoneLogin, confirm } = useContext(AuthContext);
    const [value, setValue] = React.useState({
        phone: '',
        code: '',
        error: ''
    });

    const signIn = () => {
        try {
            const confirmation = phoneLogin(value.phone);
        } catch (error: any) {
            setValue({
                ...value,
                error: error.message
            });
        }
    };

    const confirmCode = async (code: string) => {
        try {
            await confirm!.confirm(code);
        } catch (error) {
            console.log('Invalid code.');
        }
    };

    return (
        <View
            style={{ backgroundColor: 'white', width: '100%', height: '100%' }}
        >
            <View style={styles.container}>
                <View style={{ marginTop: 24 }}>
                    <Text style={styles.title}>Войти по номеру телефона</Text>
                    <View>
                        {!confirm ? (
                            <>
                                <View style={styles.textInput}>
                                    <Icon
                                        style={styles.icon}
                                        name="phone"
                                        size={20}
                                        color="gray"
                                    />
                                    <MaskedTextInput
                                        mask="+79999999999"
                                        value={value.phone}
                                        placeholder="+7"
                                        onChangeText={(text) =>
                                            setValue({ ...value, phone: text })
                                        }
                                        />
                                        
                                    {/* <TextInput
                                        placeholder="+7"
                                        value={value.phone}
                                        // className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0"
                                        onChangeText={(text) =>
                                            setValue({ ...value, phone: text })
                                        }
                                    /> */}
                                    {phoneError.length > 0 && (
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
                                            {phoneError}
                                        </Text>
                                    )}
                                </View>
                                <Pressable style={styles.pressable}>
                                    <Text
                                        style={styles.pressableText}
                                        onPress={() => signIn()}
                                    >
                                        Войти
                                    </Text>
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <View style={styles.textInput}>
                                    <Icon
                                        style={styles.icon}
                                        name="phone"
                                        size={20}
                                        color="gray"
                                    />
                                    {/* <TextInput
                                        placeholder="Код из СМС"
                                        value={value.code}
                                        // className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0"
                                        
                                    /> */}
                                        <MaskedTextInput
                                        mask="999999"
                                        value={value.code}
                                        placeholder="Код из смс"
                                        onChangeText={(text) =>
                                            setValue({ ...value, code: text })
                                        }
                                        />
                                </View>
                                <Pressable style={styles.pressable}>
                                    <Text
                                        style={styles.pressableText}
                                        onPress={() => confirmCode(value.code)}
                                    >
                                        Подтвердить
                                    </Text>
                                </Pressable>
                            </>
                        )}
                    </View>
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
            </View>
        </View>
    );
};

export default PhoneLoginScreen;

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
