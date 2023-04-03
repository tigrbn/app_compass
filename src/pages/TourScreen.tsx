import {
    Animated,
    FlatList,
    StyleSheet,
    Image,
    View,
    Dimensions,
    TextInput,
    Text,
    TouchableOpacity,
    Modal,
    Pressable
} from 'react-native';
import React, { useRef, useState, useEffect, FC } from 'react';
import Pagination from '../components/Pagination';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    CompositeNavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../routes/Tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Schedule, Tour, ImageObject } from '../types/Types';
import { API_URL } from '@env';
import { HomeParamList } from '../routes/HomeRoutes';
import Carousel from 'react-native-reanimated-carousel';
import CalendarPicker from 'react-native-calendar-picker';

interface BtnProps {
    title: string;
    onPress: any;
    disabled: boolean;
}

type Props = CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'HomeStack'>,
    NativeStackNavigationProp<HomeParamList, 'TourScreen'>
>;
type RouteProps = RouteProp<HomeParamList, 'TourScreen'>;
// export type Props = NativeStackNavigationProp<RootStackParamList, 'Category'>;

const TourScreen: FC = () => {
    const navigation = useNavigation<Props>();
    const route = useRoute<RouteProps>();
    const [index, setIndex] = useState(0);
    const DEVICE_WIDTH = Dimensions.get('window').width;
    const scrollX = useRef(new Animated.Value(0)).current;
    const [modalVisible, setModalVisible] = useState(false);
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
        (viewableItems: Array<ImageObject>) => {
            // console.log('viewableItems', viewableItems);
            // setIndex(viewableItems[0].id);
        }
    ).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    const { id } = route.params;
    const [tour, setTour] = useState<Tour>();
    const [imgAddress, setImgAddress] = useState<Array<ImageObject>>();
    const [infoShedules, setInfoShedules] = useState<Schedule>();
    const getCategory = async () => {
        fetch(API_URL + 'v1/tours/' + id)
            .then((response) => response.json())
            .then((json) => {
                setTour(json);
                setImgAddress(json.images);
                setInfoShedules(json.schedules[0]);
                // console.log(json.images);
            })
            .catch((error) => console.error(error));
        // .finally(() => setLoading(false));
    };

    const dnyaText = <Text> дня</Text>;
    const dneyText = <Text> дней</Text>;
    let textDay;
    if (infoShedules?.dateForHumans == 0 && infoShedules?.dateForHumans > 5) {
        textDay = dneyText;
    } else {
        textDay = dnyaText;
    }

    const chasovText = <Text>часов</Text>;
    const chasaText = <Text>часа</Text>;
    const chasText = <Text>час</Text>;

    let textHourse;
    if (infoShedules?.hoursForHumans == 1 && infoShedules?.dateForHumans < 1) {
        textHourse = chasText;
    } else if (
        infoShedules?.hoursForHumans < 5 &&
        infoShedules?.dateForHumans < 1
    ) {
        textHourse = chasaText;
    } else if (
        infoShedules?.hoursForHumans > 6 &&
        infoShedules?.dateForHumans < 1
    ) {
        textHourse = chasovText;
    }

    // if (infoShedules!.dateForHumans < 1) {
    //     infoShedules.dateForHumans = '';
    // }
    // if (infoShedules!.dateForHumans > 1) {
    //     infoShedules!.hoursForHumans = '';
    // }

    useEffect(() => {
        getCategory();
    }, []);

    let [counter, setCounter] = useState(1);
    let [isDisabled, setDisabled] = useState(false);
    let increment = () => {
        let newValue = (counter += 1);
        setCounter(newValue);
        if (newValue >= infoShedules!.space_current) {
            setDisabled(true);
        }
    };

    let decrement = () => {
        let newValue = counter;
        if (newValue > 1) {
            newValue = counter -= 1;
            // console.log(newValue)
        }
        setCounter(newValue);
        if (newValue <= infoShedules!.space_current) {
            setDisabled(false);
        }
    };

    const Btn: FC<BtnProps> = ({ title, onPress, disabled }) => {
        return (
            <Pressable
                onPress={onPress}
                disabled={disabled}
                style={{
                    width: 30,
                    height: 35,
                    backgroundColor: '#002A57',
                    borderRadius: 14,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Feather name={title} color="white" size={16} />
            </Pressable>
        );
    };

    return (
        <ScrollView style={{backgroundColor: 'white'}}  
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
            <FlatList
                data={imgAddress}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                // onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                // keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                    <Image
                        resizeMode="cover"
                        style={{ width: DEVICE_WIDTH, flex: 1, height: 300 }}
                        source={{
                            uri:
                                'http://81.200.150.54/storage/' +
                                item.image_name
                        }}
                    />
                )}
            />
            <View>
                <View style={{ width: '90%', alignSelf: 'center'}}>
                    <Text
                        style={{
                            color: '#002A57',
                            marginTop: 16,
                            fontSize: 24,
                            fontFamily: 'Montserrat-Bold',
                            fontSize: 20,
                            lineHeight: 30,
                            top: 10,
                            flex: 1,
                            alignSelf: 'flex-start',
                            paddingBottom: 30
                        }}
                    >
                        {tour?.title}
                    </Text>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginBottom: 30,
                            width: '70%'
                        }}
                    >
                        <Feather
                            name="map"
                            color="#001B36"
                            size={20}
                            style={{ marginRight: 12 }}
                        />
                        <Text
                            style={{
                                color: '#002A57',
                                fontFamily: 'Montserrat-Medium',
                                fontSize: 15
                            }}
                        >
                            {tour?.location}
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginBottom: 10
                        }}
                    >
                        <View style={styles.counter}>
                            <Btn
                                onPress={decrement}
                                title={'minus'}
                                disabled={isDisabled}
                            />
                            <Text
                                style={{
                                    color: '#002A57',
                                    paddingHorizontal: 15,
                                    height: 50,
                                    backgroundColor: 'white',
                                    paddingTop: 10,
                                    fontSize: 20
                                }}
                            >
                                {counter}
                            </Text>
                            <Btn
                                onPress={increment}
                                disabled={isDisabled}
                                title={'plus'}
                            />
                        </View>
                        <Text
                            style={{
                                color: '#002A57',
                                alignSelf: 'center', 
                                fontSize: 20
                            }}
                        >
                            <Feather name="clock" color="#001B36" size={22} />{' '}
                            {infoShedules?.dateForHumans}
                            {textDay}
                            {/* {infoShedules?.hoursForHumans} {textHourse} */}
                        </Text>
                    </View>
                    {infoShedules?.space_current && (
                        <View style={{ marginBottom: 10 }}>
                            <Text
                                style={{
                                    color: '#002A57',
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: 20,
                                    lineHeight: 30,
                                    top: 10,
                                    flex: 1,
                                    alignSelf: 'flex-start'
                                }}
                            >
                                Размер группы
                            </Text>
                            <Text style={{ color: '#002A57', fontSize: 17, top: 15, flex: 1, alignSelf: 'flex-start', paddingBottom: 15 }}>
                                До {infoShedules?.space_current} человек
                            </Text>
                        </View>
                    )}
                    {tour?.accommodation && (
                        <View style={{ marginBottom: 10 }}>
                            <Text
                                style={{
                                    color: '#002A57',
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: 20,
                                    lineHeight: 30,
                                    top: 10,
                                    flex: 1,
                                    alignSelf: 'flex-start'
                                }}
                            >
                                Размещение
                            </Text>
                            <Text style={{ color: '#002A57', fontSize: 17, top: 15, flex: 1, alignSelf: 'flex-start', paddingBottom: 15 }}>
                                {tour?.accommodation}
                            </Text>
                        </View>
                    )}
                    {infoShedules?.meet_place && (
                        <View style={{ marginBottom: 10 }}>
                            <Text
                                style={{
                                    color: '#002A57',
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: 20,
                                    lineHeight: 30,
                                    top: 10,
                                    flex: 1,
                                    alignSelf: 'flex-start'
                                }}
                            >
                                Место сбора:
                            </Text>
                            <Text style={{ color: '#002A57', fontSize: 17, top: 15, flex: 1, alignSelf: 'flex-start', paddingBottom: 15 }}>
                                {infoShedules?.meet_place}
                            </Text>
                        </View>
                    )}
                    <View style={{ marginBottom: 10 }}>
                        <Text
                            style={{
                                color: '#002A57',
                                fontFamily: 'Montserrat-Bold',
                                fontSize: 20,
                                lineHeight: 30,
                                top: 10,
                                flex: 1,
                                alignSelf: 'flex-start'
                            }}
                        >
                            Описание
                        </Text>
                        <Text style={{ color: '#002A57', fontSize: 17, top: 15, flex: 1, alignSelf: 'flex-start', paddingBottom: 15 }}>
                            {tour?.description}
                        </Text>
                    </View>
                    <View style={styles.price_container}>
                        <View>
                            <Text
                                style={{
                                    color: '#002A57',
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: 20,
                                }}
                            >
                                от {infoShedules ? infoShedules.price / 1 : ''}₽
                            </Text>
                            <Text
                                style={{
                                    color: '#002A57',
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: 20,
                                }}
                            >
                                с человека
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            style={styles.zabron}
                        >
                            <Text
                                style={{
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                    paddingTop: 2,
                                    paddingBottom: 2,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontFamily: 'Montserrat-Medium'
                                }}
                            >
                                Забронировать
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text
                            style={{
                                color: '#00274E',
                                fontFamily: 'Montserrat-Bold',
                                fontSize: 20,
                                lineHeight: 30,
                                top: 10,
                                flex: 1,
                                alignSelf: 'flex-start',
                                fontSize: 16,
                                marginTop: 10
                            }}
                        >
                            Бронирование тура
                        </Text>
                        <View style={{ width: '100%', flex: 1 }}>
                            <CalendarPicker />
                        </View>

                        <Text
                            style={{
                                color: '#002A57',
                                fontFamily: 'Montserrat-Bold',
                                fontSize: 20,
                                lineHeight: 30,
                                top: 10,
                                flex: 1,
                                alignSelf: 'flex-start'
                            }}
                        >
                            Название тура:
                        </Text>
                        <Text>{tour?.title}</Text>
                        <Text>Количество мест:</Text>
                        <Text>{counter}</Text>
                        <Text>Стоимость:</Text>
                        <Text>
                            {infoShedules
                                ? (counter * infoShedules?.price) / 1
                                : ''}{' '}
                            ₽
                        </Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={{ color: 'white' }}>Подтвердить</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mapPng: {
        width: 20,
        height: 20,
        tintColor: '#002A57'
    },
    dataTitle: {
        color: '#0E1F40',
        fontSize: 20,
        paddingLeft: 10,
        marginLeft: 45,
        marginTop: 20
    },
    zabron: {
        backgroundColor: '#ECBE00',
        color: 'white',
        borderRadius: 19,
        padding: 15,
        alignSelf: 'flex-end'
    },
    price_container: {
        flexDirection: 'row',
        marginTop: '5%',
        marginBottom: '15%',
        justifyContent: 'space-between'
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        marginRight: 22
    },
    centeredView: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        // marginTop: 22,
    },
    centeredView2: {
        // justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center',
        width: '90%'
        // marginTop: 22,
        // width: '80%'
    },
    modalView: {
        alignSelf: 'center',
        margin: 64,
        backgroundColor: 'white',
        padding: 16,
        flex: 1,
        flexDirection: 'column',
        width: '60%',
        // alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        backgroundColor: '#ECBE00',
        color: 'white',
        borderRadius: 28,
        padding: 10,
        paddingLeft: 35,
        paddingRight: 35,
        marginTop: 30,
        alignSelf: 'center'
    },
    buttonOpen: {
        backgroundColor: '#F194FF'
    },
    buttonClose: {
        position: 'relative'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        position: 'absolute',
        top: 15,
        right: 0
    },
    textInput: {
        backgroundColor: 'white',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        width: '100%',
        marginTop: '10%',
        marginBottom: '10%'
    }
});
export default TourScreen;
