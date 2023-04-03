import React, { FC } from 'react';
import {
    BottomTabBarProps,
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
// import CategoryList from '../pages/CategoryList';
import SettingsScreen from '../pages/Settings';
import SearchScreen from '../pages/Search';
// import FavoritesScreen from "../screens/Favorites";
import Feather from 'react-native-vector-icons/Feather';
import Favorites from '../pages/Favorites';
import Home from '../pages/Home';
import { Pressable, Text, View } from 'react-native';
import {
    NavigatorScreenParams,
    Route,
    useNavigation
} from '@react-navigation/native';
import { Button } from 'react-native/Libraries/Components/Button';
import HomeStack, { HomeParamList } from './HomeRoutes';

export type TabParamList = {
    HomeStack: NavigatorScreenParams<HomeParamList>;
    SearchScreen: undefined;
    SettingsScreen: undefined;
    Favorites: undefined;
};
const Tab = createBottomTabNavigator<TabParamList>();

const Tabs = () => {
    // const navigation = useNavigation();
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarStyle: { backgroundColor: 'white' },
                tabBarActiveTintColor: '#002A57',
                tabBarInactiveTintColor: 'rgba(0, 27, 54, 0.4)',
                // headerTintColor: 'black',
                headerStyle: {
                    elevation: 10
                },
                headerTitleStyle: {
                    fontFamily: 'Montserrat-Medium'
                },
                tabBarLabelStyle: {
                    fontFamily: 'Montserrat-Medium'
                },
                headerLeftContainerStyle: {
                    paddingHorizontal: 16
                },
                headerLeft: () => (
                    <Pressable
                        onPress={() =>
                            navigation.navigate('HomeStack', {
                                screen: 'Categories'
                            })
                        }
                    >
                        <Feather name="menu" size={32} color={'#002A57'} />
                    </Pressable>
                )
            })}
            // sceneContainerStyle={{ backgroundColor: 'white' }}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Feather
                            name="home"
                            size={size ? size : 12}
                            color={focused ? color : 'rgba(0, 27, 54, 0.4)'}
                        />
                    ),
                    title: 'Главная'
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Feather
                            name="search"
                            size={size ? size : 12}
                            color={focused ? color : 'rgba(0, 27, 54, 0.4)'}
                        />
                    ),
                    title: 'Поиск'
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarShowLabel: true,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Feather
                            name="heart"
                            size={size ? size : 12}
                            color={focused ? color : 'rgba(0, 27, 54, 0.4)'}
                        />
                    ),
                    title: 'Избранное'
                }}
            />
            <Tab.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    tabBarShowLabel: true,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Feather
                            name="user"
                            size={size ? size : 12}
                            color={focused ? color : 'rgba(0, 27, 54, 0.4)'}
                        />
                    ),
                    title: 'Профиль'
                }}
            />
        </Tab.Navigator>
    );
};
export default Tabs;
