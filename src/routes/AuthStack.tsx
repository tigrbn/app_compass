import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../pages/Welcome';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassScreen from '../pages/ForgotPass';
import PrivacyScreen from '../pages/Privacy';
import PersonalScreen from '../pages/Personal';
import PhoneLoginScreen from '../pages/PhoneLogin';

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    Welcome: undefined;
    ForgotPass: undefined;
    Privacy: undefined;
    Personal: undefined;
    PhoneLogin: undefined;
};
const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name="Welcome"
                options={{ title: '' }}
                component={WelcomeScreen}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    title: 'Авторизация',
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    title: 'Регистрация',
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                }}
            />
            <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
            <Stack.Screen
                name="Privacy"
                component={PrivacyScreen}
                options={{ title: '' }}
            />
            <Stack.Screen
                name="Personal"
                component={PersonalScreen}
                options={{ title: '' }}
            />
            <Stack.Screen
                name="PhoneLogin"
                component={PhoneLoginScreen}
                options={{ title: '' }}
            />
        </Stack.Navigator>
    );
};
export default AuthStack;
