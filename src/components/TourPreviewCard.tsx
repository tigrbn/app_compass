import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { DEVICE_WIDTH, TourPreview } from '../types/Types';

interface Param {
    item: TourPreview;
    navigation: NavigationProp<Record<string, T>>;
    index: number;
}

const styles = StyleSheet.create({
    Panelslider_mini: {
        backgroundColor: 'rgba(0, 17, 35, 0.65)',
        borderRadius: 9,
        height: 80,
        position: 'absolute',
        width: '100%',
        // left: 0,
        bottom: 0
    },
    textPanelslider_mini: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'white',
        lineHeight: 18,
        width: '80%',
        paddingLeft: 15,
        paddingTop: 10
    },
    pricePanelText_mini: {
        color: '#F4D150',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20,
        fontWeight: '500',
        fontSize: 16
    }
});

const TourPreviewCard: FC<Param> = ({ item, navigation, index }: Param) => {
    // const navigation = useNavigation();
    return (
        <Pressable
            style={[
                {
                    width: (DEVICE_WIDTH / 2.2)
                },
                index % 2 === 0
                    ? {
                          paddingRight: 2.5
                      }
                    : {
                          paddingLeft: 2.5
                      }
            ]}
            onPress={() =>
                navigation.navigate('HomeStack', {
                    screen: 'TourScreen',
                    params: {
                        id: item.id,
                        title: item.title
                    }
                })
            }
        >
            <Image
                style={{
                    width: '100%',
                    flex: 1,
                    height: 180,
                    borderRadius: 9,
                    resizeMode: 'cover',
                }}
                source={{
                    uri:
                        'http://81.200.150.54/storage/' + item.image?.image_name
                }}
            />
            <View style={[styles.Panelslider_mini, index % 2 === 0 ? {left: 0 } : {right: 0}]}>
                <Text
                    style={styles.textPanelslider_mini}
                >{`${item.title}`}</Text>
                {/* {fav.includes(item) ? (
                 <Pressable style={{position: "absolute", top: 15, left: 15}}  onPress={() => setFav(fav.filter((x) => x.id !== item.id))}>
                   <Icon name="heart" size={30} color="#D92030" />
               </Pressable>
              ):(
                <Pressable style={{position: "absolute", top: 15, left: 15}} onPress={() => setFav([...fav,item])}>
                    <Icon  name="heart" size={30} color="#F2F2F2" />
              </Pressable>
              )} */}
                <Text style={styles.pricePanelText_mini}>
                    {`${item.lower_price / 1}`} ₽
                </Text>
            </View>
        </Pressable>
    );
};
export default TourPreviewCard;
