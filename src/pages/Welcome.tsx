import React, { FC, useEffect } from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../routes/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;
// type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const WelcomeScreen: FC<Props> = (props) => {
    // const navigation = useNavigation<Props>();
    return (
        <View
            style={{ backgroundColor: 'white', width: '100%', height: '100%' }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>ComPass</Text>
                <Text style={styles.teaser}> Открой Россию </Text>
                <Pressable style={styles.pressable}>
                    <Text
                        style={styles.pressableText}
                        onPress={() => props.navigation.navigate('Login')}
                    >
                        Авторизоваться
                    </Text>
                </Pressable>
                <Pressable style={styles.pressable}>
                    <Text
                        style={styles.pressableText}
                        onPress={() => props.navigation.navigate('Register')}
                    >
                        Зарегистрироваться
                    </Text>
                </Pressable>
                <Pressable style={styles.pressable}>
                    <Text
                        style={styles.pressableText}
                        onPress={() => props.navigation.navigate('PhoneLogin')}
                    >
                        Войти по номеру телефона
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 60,
        color: '#0053A9',
        textAlign: 'left',
        fontWeight: '600',
        fontFamily: "Montserrat-SemiBold"
    },
    teaser: {
        fontSize: 20,
        lineHeight: 28,
        textAlign: 'left',
        fontWeight: '600',
        color: '#0E1F40',
        fontFamily: "Montserrat-SemiBold",
        paddingBottom: 60
    },
    pressable: {
        backgroundColor: '#0053A9',
        width: '80%',
        fontSize: 30,
        alignSelf: 'center',
        borderRadius: 9,
        margin: 10
    },
    pressableText: {
        color: 'white',
        padding: 15,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '400',
        fontFamily: "Montserrat-Medium"
    }
});

export default WelcomeScreen;
