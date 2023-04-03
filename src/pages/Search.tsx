import {
    BottomTabNavigationProp,
    BottomTabScreenProps
} from '@react-navigation/bottom-tabs';
import {
    CompositeNavigationProp,
    useNavigation
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Pressable,
    Image,
    Dimensions
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { TabParamList } from '../routes/Tabs';
import { RootState, useAppDispatch } from '../redux/store';
import { SearchParams, searchTours } from '../redux/searchSlice';
import TourPreviewCard from '../components/TourPreviewCard';

type Props = BottomTabScreenProps<TabParamList, 'SearchScreen'>;



const SearchScreen: FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState<string>('');

    const { search, isLoading, error } = useSelector(
        (state: RootState) => state.searchReducer
    );

    useEffect(() => {
        const params: SearchParams = {
            dispatch: dispatch,
            search: searchText
        };
        dispatch(searchTours(params));
    }, [searchText]);

    return (
        <View
            style={{
                paddingHorizontal: 16,
                backgroundColor: 'white',
                width: '100%',
                height: '100%'
            }}
        >
            <View style={styles.textInput}>
                <Feather
                    style={styles.icon}
                    name="search"
                    size={18}
                    color="gray"
                />
                <TextInput
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
                    style={styles.input}
                    placeholder="Поиск по турам"
                />
            </View>

            {search && (
                <FlatList
                    data={search}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={{height: 10}} />}
                    numColumns={2}
                    key={2}
                    renderItem={({ item, index }) => (
                        <TourPreviewCard item={item} navigation={props.navigation} index={index}/>
                    )}
                    style={{ marginTop: 30 }}
                />
            )}
        </View>
    );
};
export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 37,
        flex: 3
    },
    icon: {
        padding: 15
    },
    input: {
        flex: 1
    },
    text: {
        color: '#0E1F40',
        marginTop: 15
    },
    link: {
        color: '#0E1F40',
        fontWeight: 'bold'
    },
    pressable: {
        backgroundColor: '#056CF2',
        width: '100%',
        fontSize: 30,
        alignSelf: 'center'
    },
    textInput: {
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: '#171717',
        // shadowOffset: { width: -2, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 3,
        
        width: '105%',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ADADAD',
        borderStyle: 'solid',
        borderRadius: 20,
        marginTop: 20
    },
});
