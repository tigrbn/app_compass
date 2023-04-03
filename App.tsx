import React, { createContext, Fragment, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import UserStack from './src/routes/Tabs';
import AuthStack from './src/routes/AuthStack';
import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import RootStack from './src/routes/Routes';
import { AuthProvider } from './src/providers/AuthProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/redux/store';

// type User = FirebaseAuthTypes.User | null;

// export const UserContext = createContext<User>(null);

const App = () => {
    // const [initializing, setInitializing] = useState(true);
    // const [listenUser, setListenUser] = useState(false);
    // const [user, setUser] = useState<User>(null);
    // //   const appSettings = useAppSettings();

    // /** Listen for auth state changes */
    // useEffect(() => {
    //     const authListener = auth().onAuthStateChanged((result) => {
    //         setUser(result);
    //         if (initializing && !listenUser) {
    //             setInitializing(false);
    //             setListenUser(true);
    //         }
    //     });

    //     return () => {
    //         if (authListener) {
    //             authListener();
    //         }
    //     };
    // }, [initializing, listenUser]);

    // /** Listen for user changes */
    // useEffect(() => {
    //     let userListener: () => void;

    //     if (listenUser) {
    //         // TODO @react-native-firebase/auth provides `onUserChanged` which is this and more.
    //         // what else can we add and still be web-compatible?
    //         userListener = auth().onIdTokenChanged((result) => {
    //             setUser(result);
    //         });
    //     }

    //     return () => {
    //         if (userListener) {
    //             userListener();
    //         }
    //     };
    // }, [listenUser]);

    // if (initializing) {
    //     let waiting = true;
    //     setTimeout(() => {
    //         waiting = false;
    //     }, 1000);
    //     return (
    //         <View>
    //             <Text>asd</Text>
    //         </View>
    //     );
    // }
    // return user ? <UserStack /> : <AuthStack />;
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <AuthProvider>
                        <RootStack />
                    </AuthProvider>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
};
export default App;
