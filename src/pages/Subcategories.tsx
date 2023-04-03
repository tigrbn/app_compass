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
import TourPreviewCard from '../components/TourPreviewCard';
import { HomeParamList } from '../routes/HomeRoutes';
import { TabParamList } from '../routes/Tabs';
import { Tour, TourPreview } from '../types/Types';

type Props = CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'HomeStack'>,
    NativeStackNavigationProp<HomeParamList, 'Subcategories'>
>;
type RouteProps = RouteProp<HomeParamList, 'Subcategories'>;
// export type Props = NativeStackNavigationProp<RootStackParamList, 'Category'>;

const styles = StyleSheet.create({
    catItems: {
        fontSize: 22,
        paddingTop: '5%',
        paddingBottom: '5%',
        fontWeight: 'bold',
        color: '#001B36',
        right: 0,
        width: 350
    }
});

const Subcategories: FC = () => {
    const navigation = useNavigation<Props>();
    const route = useRoute<RouteProps>();
    const { id, title } = route.params;
    const [isLoading, setLoading] = useState(false);
    const [subcategories, setSubCategories] = useState<Array<TourPreview>>([]);
    const getCategories = () => {
        fetch('http://81.200.150.54/api/v1/categories/' + id)
            .then((response) => response.json())
            .then((json) => setSubCategories(json.tours))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        getCategories();
    }, []);
    return (
        <SafeAreaView
            style={{
                paddingHorizontal: 16,
                backgroundColor: 'white',
                width: '100%',
                height: '100%'
            }}
        >
            {/* {isLoading ? (
                <Text>Загрузка...</Text>
            ) : ( */}
            <Text
                style={{
                    color: '#00274E',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 24,
                    top: 25
                }}
            >
                {title}
            </Text>
            <View style={{top: 35}}>
                <FlatList
                    data={subcategories}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 5 }} />
                    )}
                    numColumns={2}
                    key={2}
                    style={{ marginTop: 10 }}
                    renderItem={({ item, index }) => (
                        <TourPreviewCard
                            item={item}
                            navigation={navigation}
                            index={index}
                        />
                    )}
                />
            </View>
            {/* )} */}
        </SafeAreaView>
    );
};

export default Subcategories;
