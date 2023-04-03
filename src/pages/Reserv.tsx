import React, { FC } from 'react';
import {
    Modal,
    TouchableOpacity,
    Text,
    Pressable,
    View,
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import { LinearGradient } from 'react-native-linear-gradient';

const Reserv: FC = () => {
    const [modalVisible, setModalVisible] = React.useState(false);
    return (
        <View>
            <Pressable onPress={() => setModalVisible(true)}>
                <Feather name="user" size={24} color={'rgba(0, 27, 54, 0.4)'} />
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={{ flex: 1, backgroundColor: 'rgba(0, 27, 54, 0.4)' }}
                >
                    <View>
                        <LinearGradient
                            colors={['white', 'white']}
                            style={{ flex: 1, borderRadius: 20 }}
                        >
                            <Pressable onPress={() => auth().signOut()}>
                                <View>
                                    <Feather
                                        name="log-out"
                                        color="#001B36"
                                        size={30}
                                    />
                                    <Text style={{ color: '#001B36' }}>
                                        {' '}
                                        Выйти
                                    </Text>
                                </View>
                            </Pressable>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default Reserv;
