import { API_URL } from '@env';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
    CompositeNavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    FlatList,
    TouchableOpacity,
    Pressable,
    StyleSheet
} from 'react-native';
import { HomeParamList } from '../routes/HomeRoutes';
import { TabParamList } from '../routes/Tabs';
import { Category } from '../types/Types';

type Props = CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'HomeStack'>,
    NativeStackNavigationProp<HomeParamList, 'CategoryScreen'>
>;
type RouteProps = RouteProp<HomeParamList, 'CategoryScreen'>;

const styles = StyleSheet.create({
    catItems: {
        fontSize: 22,
        paddingTop: '5%',
        paddingBottom: '5%',
        fontWeight: 'bold',
        color: '#001B36',
        lineHeight: 22,
        left: 16,
        right: 0,
        width: 350
    }
});

const CategoryScreen: FC = () => {
    const navigation = useNavigation<Props>();
    const route = useRoute<RouteProps>();
    const { id, title } = route.params;
    const [isLoading, setLoading] = useState(false);
    const [ccategory, setCategories] = useState<Array<Category>>();
    const getCategories = () => {
        fetch(API_URL + 'v1/categories/' + id)
            .then((response) => response.json())
            .then((json) => setCategories(json.subcategories))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getCategories();
        console.log(ccategory);
    }, []);
    return (
        <SafeAreaView style={{ paddingHorizontal: 16, backgroundColor: 'white', width: '100%', height: '100%' }}>
            {/* {isLoading ? (
                <Text>Загрузка...</Text>
            ) : ( */}
                <Text style={{ color: '#00274E', fontFamily: 'Montserrat-Bold', fontSize: 22, top: 30, left: 5 }}>{title}</Text>
                <View>
                    <FlatList
                        data={ccategory}
                        style={styles.catItems}
                        keyExtractor={({ id }) => id.toString()}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() =>
                                    navigation.navigate('Subcategories', {
                                        id: item.id,
                                        title: item.name
                                    })
                                }
                            >
                                <Text  style={{ color: '#00274E', fontFamily: 'Montserrat-Medium', fontSize: 18, lineHeight: 35, paddingBottom: 16, top: 25,  textAlign: 'left'}}>
                                    {item.name}
                                </Text>
                            </Pressable>
                        )}
                    />
                </View>
            {/* )} */}
        </SafeAreaView>
    );
};

export default CategoryScreen;
