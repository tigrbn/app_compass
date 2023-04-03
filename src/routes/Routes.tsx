import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
//Pages
import ForgotPass from '../pages/ForgotPass';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Categories from '../pages/Categories';
import Subcategories from '../pages/Subcategories';
import TourScreen from '../pages/TourScreen';
import CategoryScreen from '../pages/CategoryScreen';
import WelcomeScreen from '../pages/Welcome';
import { AuthContext } from '../providers/AuthProvider';
import Loading from '../components/Loading';
import AuthStack from './AuthStack';
import Tabs from './Tabs';

// declare global {
//     namespace ReactNavigation {
//         interface RootParamList extends RootStackParamList {}
//     }
// }

const RootStack = () => {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [initializing, setInitializing] = useState<boolean>(true);
    const onAuthStateChanged = (user: any) => {
        setUser(user);
        if (initializing) setInitializing(false);
        setLoading(false);
    };
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (loading) {
        return <Loading />;
    }
    return user ? <Tabs /> : <AuthStack />;
};

export default RootStack;
