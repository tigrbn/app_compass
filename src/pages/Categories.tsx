import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
    CompositeNavigationProp,
    useNavigation
} from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Pressable
} from 'react-native';
import { HomeParamList } from '../routes/HomeRoutes';
import { TabParamList } from '../routes/Tabs';
import { Category } from '../types/Types';

type Props = NativeStackScreenProps<HomeParamList, 'Categories'>;

// type Props = NativeStackNavigationProp<RootStackParamList, 'Categories'>;
// type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const styles = StyleSheet.create({
    catItems: {
        color: '#001B36',
        left: 10,
        top: 20,
        right: 0,
        width: '80%'
    }
});

const Categories: FC<Props> = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Array<Category>>();
    // const navigation = useNavigation<Props>();
    useEffect(() => {
        setLoading(true);
        fetch('http://81.200.150.54/api/v1/categories/')
            .then((response) => response.json())
            .then((json) => setCategories(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <SafeAreaView style={{ paddingHorizontal: 16, backgroundColor: 'white', width: '100%', height: '100%' }}>
            {/* {isLoading ? (
                <Text>Загрузка...</Text>
            ) : ( */}
                <Text style={{ color: '#00274E', fontFamily: 'Montserrat-Bold', fontSize: 22, top: 30, left: 5 }}>Категории</Text>
                <View>
                    <FlatList
                        data={categories}
                        style={styles.catItems}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() =>
                                    props.navigation.navigate('CategoryScreen', {
                                        id: item.id,
                                        title: item.name
                                    })
                                }
                            >
                                <Text style={{ color: '#00274E', fontFamily: 'Montserrat-Medium', fontSize: 18, lineHeight: 35, paddingBottom: 16, textAlign: 'left', top: 25}}>
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

export default Categories;
