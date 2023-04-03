import React, { useEffect, useState, useRef, FC } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import {
    Animated,
    SafeAreaView,
    Pressable,
    Image,
    ScrollView,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import TourScreen from './TourScreen';
import Pagination from '../components/Pagination';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabParamList } from '../routes/Tabs';
import {
    NativeStackNavigationProp,
    NativeStackScreenProps
} from '@react-navigation/native-stack';
import {
    CompositeNavigationProp,
    CompositeScreenProps,
    useNavigation
} from '@react-navigation/native';
import {
    BottomTabNavigationProp,
    BottomTabScreenProps
} from '@react-navigation/bottom-tabs';
import { Tour, TourPreview } from '../types/Types';
import Carousel from 'react-native-reanimated-carousel';
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { fetchTours } from '../redux/toursSlice';
import { HomeParamList } from '../routes/HomeRoutes';
import TourPreviewCard from '../components/TourPreviewCard';

type HomeScreenNavigationProp = NativeStackScreenProps<HomeParamList, 'Home'>;
// type Props = NativeStackScreenProps<TabParamList, 'Home'>;

const DEVICE_WIDTH = Dimensions.get('window').width;

const Home: FC<HomeScreenNavigationProp> = (props) => {
    // const navigation = useNavigation<HomeScreenNavigationProp>();
    const dispatch = useAppDispatch();
    const [index, setIndex] = useState(0);
    const [favlocal] = useState();
    const [fav, setFav] = useState([]);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [isLoading, setLoading] = useState(false);
    const tours = useSelector((state: RootState) => state.toursReducer.tours);
    const [info, setInfo] = useState([]);
    const [banners, setBann] = useState<Array<TourPreview>>();

    const DEVICE_HEIGHT = Dimensions.get('window').height;
    const handleOnScroll = (event: any) => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX
                        }
                    }
                }
            ],
            {
                useNativeDriver: false
            }
        )(event);
    };

    const handleOnViewableItemsChanged = useRef(
        (viewableItems: Array<TourPreview>) => {
            // console.log('viewableItems', viewableItems);
            // setIndex(viewableItems.index);
        }
    ).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    const getCategories = () => {
        dispatch(fetchTours(dispatch));
        // console.log(categories);
    };

    const getBanners = () => {
        fetch('http://81.200.150.54/api/v1/banners/')
            .then((response) => response.json())
            .then((json) => {
                console.log(json.banners);
                setBann(json.banners);
            })
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        // setLoading(true);
        dispatch(fetchTours(dispatch));
        console.log(tours);
        // getInfo();
        getBanners();
    }, []);
    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            {/* {isLoading ? (
                <Text>Загрузка...</Text>
            ) : ( */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {banners ? (
                    <Carousel
                        loop={true}
                        width={DEVICE_WIDTH}
                        data={banners}
                        height={(DEVICE_WIDTH - 32) / 1.3}
                        scrollAnimationDuration={16000}
                        pagingEnabled={true}
                        autoPlay={true}
                        style={{ paddingLeft: 16, paddingRight: 16, top: 16 }}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() =>
                                    props.navigation.navigate('TourScreen', {
                                        id: item.id,
                                        title: item.title
                                    })
                                }
                            >
                                <View>
                                    <Image
                                        style={{
                                            width: DEVICE_WIDTH - 32,
                                            position: 'relative',
                                            borderRadius: 9,
                                            resizeMode: 'stretch',
                                            height: 240,
                                            marginLeft: 16,
                                            marginRight: 16
                                        }}
                                        source={{
                                            uri:
                                                'http://81.200.150.54/storage/' +
                                                item.image?.image_name
                                        }}
                                    />
                                </View>
                                <View style={styles.Panelslider}>
                                    <Text
                                        style={styles.textPanelslider}
                                    >{`${item.title}`}</Text>
                                    <Text style={styles.pricePanelText}>
                                        {`${item.lower_price / 1}`} ₽
                                    </Text>
                                </View>
                                {/* {fav.includes(item) ? (
                 <Pressable style={{position: "absolute", top: 15, left: 15}}  onPress={() => setFav(fav.filter((x) => x.id !== item.id))}>
                   <Icon name="heart" size={30} color="#D92030" />
               </Pressable>
              ):(
                <Pressable style={{position: "absolute", top: 15, left: 15}} onPress={() => setFav([...fav,item])}>
                    <Icon  name="heart" size={30} color="#F2F2F2" />
              </Pressable>
              )} */}
                            </Pressable>
                        )}
                    />
                ) : (
                    <></>
                )}
                <View style={{paddingHorizontal: 16}}>
                    <Text style={styles.title}>Рекомендации</Text>
                    <FlatList
                        data={tours}
                        numColumns={2}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => <View style={{height: 10}} />}
                        scrollEnabled={false}
                        renderItem={({ item, index}) => (
                            <TourPreviewCard item={item} navigation={props.navigation} index={index}/>
                        )}
                    />
                </View>
            </ScrollView>
            {/* )} */}
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    Panelslider: {
        backgroundColor: 'rgba(0, 17, 35, 0.65)',
        borderBottomLeftRadius: 19,
        borderBottomRightRadius: 19,
        height: 90,
        width: DEVICE_WIDTH - 32,
        position: 'absolute',
        left: 0,
        bottom: 0,
        paddingTop: 15,
        paddingLeft: 15,
        paddingHorizontal: 16,
        paddingVertical: 7,
        marginLeft: 16,
        marginRight: 16
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        color: '#00274E',
        flex: 1,
        alignSelf: 'flex-start',
        paddingBottom: 26
    },
    textPanelslider: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        color: 'white',
        lineHeight: 22,
        width: '60%'
    },
    Panelslider_mini: {
        backgroundColor: 'rgba(0, 17, 35, 0.65)',
        borderRadius: 9,
        height: 80,
        position: 'absolute',
        right: 5,
        left: 5,
        bottom: 5,
        
    },
    textPanelslider_mini: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'white',
        lineHeight: 18,
    },
    pricePanelText_mini: {
        color: '#F4D150',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20,
        fontWeight: '500',
        fontSize: 16
    },
    zagText: {
        color: '#00274E',
        fontSize: 20,
        lineHeight: 22,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 30,
        marginBottom: 10
    },
    linkText: {
        color: '#00274E',
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '400',
        position: 'absolute',
        right: 10,
        top: 30
    },
    gallery: {
        position: 'relative',
        paddingRight: 20,
        borderRadius: 9,
        alignSelf: 'flex-start'
    },
    img: {
        height: 280,
        position: 'relative',
        borderRadius: 9
    },
    textPanel: {
        zIndex: 9,
        height: 80,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderRadius: 9,
        padding: 10,
        margin: 5,
        backgroundColor: 'rgba(0, 17, 35, 0.5)'
    },
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    box: {
        width: '50%',
        height: '50%'
    },
    inner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 200,
        height: 200
    },
    colText: {
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 18,
        color: 'white',
        width: '90%'
    },
    priceText: {
        color: '#F4D150',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 15
    },
    pricePanelText: {
        color: '#F4D150',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20,
        fontWeight: '500',
        fontSize: 25
    }
});
