import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Categories from '../pages/Categories';
import CategoryScreen from '../pages/CategoryScreen';
import Home from '../pages/Home';
import Subcategories from '../pages/Subcategories';
import TourScreen from '../pages/TourScreen';

export type HomeParamList = {
    Home: undefined;
    Categories: undefined;
    CategoryScreen: { id: number, title: string };
    Subcategories: { id: number, title: string };
    TourScreen: { id: number; title: string };
};

const Stack = createNativeStackNavigator<HomeParamList>();

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Home"
                options={{ title: '' }}
                component={Home}
            />
            <Stack.Screen
                name="Categories"
                options={{ title: '' }}
                component={Categories}
            />
            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={
                    {
                        // title: 'Авторизация',
                        // headerTintColor: '#fff',
                        // headerTitleStyle: {
                        //     fontWeight: 'bold',
                        //     color: 'white'
                        // }
                    }
                }
            />
            <Stack.Screen
                name="Subcategories"
                component={Subcategories}
                options={{
                    title: 'Регистрация',
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                }}
            />
            <Stack.Screen
                name="TourScreen"
                component={TourScreen}
                options={{ title: '' }}
            />
        </Stack.Navigator>
    );
};
export default HomeStack;
