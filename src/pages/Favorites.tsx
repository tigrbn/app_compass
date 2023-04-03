import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Pressable,
    Alert
} from 'react-native';
import React, { useState, useEffect, FC } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Category, Tour } from '../types/Types';

const Favorites: FC = () => {
    const [categories, setCategories] = useState<Array<Tour>>();
    const [favlocal] = useState();
    const [fav, setFav] = useState<Array<Tour>>();
    const getCategories = () => {
        fetch('http://81.200.150.54/api/v1/tours/')
            .then((response) => response.json())
            .then((json) => setCategories(json.data))
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        getCategories();
    }, [favlocal]);
    return (
        <>
            {/* <Text style={{ textAlign: 'center', fontSize: 20 }}></Text>
            {categories?.map((item) => (
                <Pressable
                    key={item.id}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <View style={{ margin: 10 }}></View>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                        {fav?.includes(item) ? (
                            <Pressable
                                onPress={() =>
                                    setFav(fav.filter((x) => x.id !== item.id))
                                }
                            >
                                <Icon name="heart" size={18} color="red" />
                            </Pressable>
                        ) : (
                            <Pressable onPress={() => setFav([...fav!, item])}>
                                <Icon name="heart" size={18} color="gray" />
                            </Pressable>
                        )}
                    </View>
                </Pressable>
            ))} */}
            <Text>Избранное</Text>
            {fav?.map((item) => (
                <View style={{ margin: 10 }}>
                    <Text style={{ color: 'black' }}>{item.title}</Text>
                </View>
            ))}
        </>
    );
};

export default Favorites;

const styles = StyleSheet.create({});
